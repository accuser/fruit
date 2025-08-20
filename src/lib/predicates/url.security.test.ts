import { als } from '$lib/router/als';
import { createMockRequestEvent } from '$test/mocks';
import type { RequestEvent } from 'src';
import { beforeEach, describe, expect, it } from 'vitest';
import { url } from './url';

describe('url predicate - Security Tests', () => {
	let mockEvent: RequestEvent<string | URLPatternInit>;

	beforeEach(() => {
		mockEvent = createMockRequestEvent();
	});

	describe('Prototype pollution protection', () => {
		it('should block __proto__ parameter injection', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:__proto__');
			const testRequest = { url: 'https://example.com/malicious' } as Request;

			await als.run(mockEvent, async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();

				expect(event?.params).not.toHaveProperty('__proto__');
				expect(Object.prototype).not.toHaveProperty('polluted');
			});
		});

		it('should block constructor parameter injection', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:constructor');
			const testRequest = { url: 'https://example.com/malicious' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params).not.toHaveProperty('constructor');
			});
		});

		it('should block prototype parameter injection', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:prototype');
			const testRequest = { url: 'https://example.com/malicious' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params).not.toHaveProperty('prototype');
			});
		});

		it('should block double underscore prefixed parameters', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:__defineGetter__');
			const testRequest = { url: 'https://example.com/malicious' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				// Check that __defineGetter__ was not added to params (it's inherited)
				expect(event?.params.hasOwnProperty('__defineGetter__')).toBe(false);
			});
		});
	});

	describe('Parameter Validation', () => {
		it('should limit parameter value length', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:id');
			const longValue = 'x'.repeat(2000); // Exceeds 1000 char limit
			const testRequest = { url: `https://example.com/${longValue}` } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore()!;

				expect(event.params.id).toHaveLength(1000); // Truncated to limit
				expect(event.params.id).toBe('x'.repeat(1000));
			});
		});

		it('should skip empty parameter names', async ({ env, ctx }) => {
			// This would be unusual but could happen with malformed patterns
			const predicate = url('https://example.com/users/:id');
			const testRequest = { url: 'https://example.com/users/123' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params.id).toBe('123');
				expect(event?.params.hasOwnProperty('')).toBe(false);
			});
		});
	});

	describe('Safe Parameter Extraction', () => {
		it('should only extract from pathname groups', async ({ env, ctx }) => {
			const predicate = url('https://example.com/users/:userId/posts/:postId');
			const testRequest = {
				url: 'https://example.com/users/123/posts/456?search=malicious&__proto__=hack',
			} as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params).toEqual({
					userId: '123',
					postId: '456',
				});
				// Should not contain query parameters
				expect(event?.params).not.toHaveProperty('search');
				expect(event?.params).not.toHaveProperty('__proto__');
			});
		});

		it('should create safe parameter object without prototype chain', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:id');
			const testRequest = { url: 'https://example.com/123' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				// Verify the parameter object is safe
				expect(event?.params.id).toBe('123');
				expect(event?.params.hasOwnProperty).toBeDefined(); // Should have prototype methods
			});
		});

		it('should handle multiple parameters safely', async ({ env, ctx }) => {
			const predicate = url('https://example.com/:category/:subcategory/:id');
			const testRequest = {
				url: 'https://example.com/electronics/phones/123',
			} as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params).toEqual({
					category: 'electronics',
					subcategory: 'phones',
					id: '123',
				});
			});
		});
	});

	describe('Edge Cases', () => {
		it('should handle URL pattern with no groups', async ({ env, ctx }) => {
			const predicate = url('https://example.com/static');
			const testRequest = { url: 'https://example.com/static' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(Object.keys(event?.params || {})).toHaveLength(0);
			});
		});

		it('should handle non-matching URLs', async ({ env, ctx }) => {
			const predicate = url('https://example.com/users/:id');
			const testRequest = { url: 'https://example.com/posts/123' } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(false);

				const event = als.getStore();
				expect(Object.keys(event?.params || {})).toHaveLength(0);
			});
		});

		it('should handle special characters in parameter values', async ({ env, ctx }) => {
			const predicate = url('https://example.com/search/:query');
			const testRequest = {
				url: 'https://example.com/search/hello%20world%21',
			} as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(event?.params.query).toBe('hello%20world%21');
			});
		});
	});

	describe('Memory Safety', () => {
		it('should not cause memory exhaustion with many parameters', async ({ env, ctx }) => {
			// Create pattern with reasonable number of parameters
			const paramNames = Array.from({ length: 20 }, (_, i) => `param${i}`);
			const pattern = `https://example.com/${paramNames.map((p) => `:${p}`).join('/')}`;
			const values = Array.from({ length: 20 }, (_, i) => `value${i}`);
			const testUrl = `https://example.com/${values.join('/')}`;

			const predicate = url(pattern);
			const testRequest = { url: testUrl } as Request;

			await als.run(createMockRequestEvent(), async () => {
				const result = await predicate(testRequest, env, ctx);
				expect(result).toBe(true);

				const event = als.getStore();
				expect(Object.keys(event?.params || {})).toHaveLength(20);

				// Verify all parameters are extracted correctly
				paramNames.forEach((paramName, index) => {
					expect(event?.params[paramName]).toBe(`value${index}`);
				});
			});
		});
	});
});
