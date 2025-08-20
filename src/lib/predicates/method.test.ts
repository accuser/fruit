import { describe, expect, it } from 'vitest';
import { method } from './method';

describe('method', () => {
	for (const $method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const) {
		it('is true when the request method matches', ({ ctx, env }) => {
			const predicate = method($method);

			expect(predicate(new Request('https://example.com', { method: $method }), env, ctx)).toBe(true);
		});
	}

	for (const $method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const) {
		it("is false when the request method doesn't match", ({ ctx, env }) => {
			const predicate = method($method);

			expect(predicate(new Request('https://example.com', { method: 'MOCK' }), env, ctx)).toBe(false);
		});
	}
});
