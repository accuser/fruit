import { describe, expect, it } from 'vitest';
import { not } from './not';

describe('not', () => {
	it('it is true if the predicate is false', ({ ctx, env, req }) => {
		const predicate = not(() => false);

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('it is false if the predicate is true', ({ ctx, env, req }) => {
		const predicate = not(() => true);

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
