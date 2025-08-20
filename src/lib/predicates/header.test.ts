import { createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { header } from './header';

describe('header', () => {
	beforeEach((context) => {
		context.req = createMockRequest('https://example.com', { headers: { 'x-custom-header': 'example' } });
	});

	it('is true if the header is present', ({ ctx, env, req }) => {
		const predicate = header('x-custom-header');

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is false if the header is not present', ({ ctx, env, req }) => {
		const predicate = header('x-wrong-header');

		expect(predicate(req, env, ctx)).toBe(false);
	});

	it('is true if the header is present and matches', ({ ctx, env, req }) => {
		const predicate = header('x-custom-header', 'example');

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is false if the header is present but does not match', ({ ctx, env, req }) => {
		const predicate = header('x-custom-header', 'wrong-value');

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
