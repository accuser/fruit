import { describe, expect, it, vi } from 'vitest';
import { custom } from './custom';

describe('custom', () => {
	it('delegates to the custom implementation', ({ ctx, env, req }) => {
		const mock = vi.fn(() => true);

		const predicate = custom(mock);
		predicate(req, env, ctx);

		expect(mock).toHaveBeenCalledWith(req, env, ctx);
	});
});
