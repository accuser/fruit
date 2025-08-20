import { describe, expect, it, vi } from 'vitest';
import { all } from './all';

describe('all', () => {
	it('is true if all predicates are true', ({ req, ctx, env }) => {
		const p1 = vi.fn(() => true);
		const p2 = vi.fn(() => true);

		const predicate = all(p1, p2);

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is false if all predicates are false', ({ req, ctx, env }) => {
		const p1 = vi.fn(() => false);
		const p2 = vi.fn(() => false);

		const predicate = all(p1, p2);

		expect(predicate(req, env, ctx)).toBe(false);
	});

	it('is false if any predicates are true', ({ req, ctx, env }) => {
		const p1 = vi.fn(() => false);
		const p2 = vi.fn(() => true);

		const predicate = all(p1, p2);

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
