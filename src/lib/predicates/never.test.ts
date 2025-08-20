import { describe, expect, it } from 'vitest';
import { never } from './never';

describe('never', () => {
	it('is always false', ({ ctx, env, req }) => {
		const predicate = never();

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
