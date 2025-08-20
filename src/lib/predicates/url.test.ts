import { als } from '$lib/router/als';
import { createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { url } from './url';

describe('url', () => {
	beforeEach((context) => {
		context.req = createMockRequest('https://example.com/users/42');
	});

	it('is true if the url matches', ({ req, env, ctx }) => {
		const predicate = url('https://example.com');
		let result;

		als.run({ params: {} } as any, () => {
			result = predicate(req, env, ctx);
		});

		expect(result).toBe(true);
	});

	it('is false if the url does not match', ({ ctx, env, req }) => {
		const predicate = url('https://another-example.com');
		let result;

		als.run({ params: {} } as any, () => {
			result = predicate(req, env, ctx);
		});

		expect(result).toBe(false);
	});

	it('is true if the url matches with params', ({ ctx, env, req }) => {
		const predicate = url('https://example.com/users/:id');
		let result;

		als.run({ params: {} } as any, () => {
			result = predicate(req, env, ctx);
		});

		expect(result).toBe(true);
	});
});
