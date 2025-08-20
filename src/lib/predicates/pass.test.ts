import { describe, expect, it } from 'vitest';
import { pass } from './pass';

describe('pass', () => {
	it('is always true', ({ ctx, env, req }) => {
		const predicate = pass();

		expect(predicate(req, env, ctx)).toBe(true);
	});
});
