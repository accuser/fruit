import { describe, expect, it, vi } from 'vitest';
import { any } from './any';

describe('any', () => {
	it('is true if all predicates are true', async ({ req, ctx, env }) => {
		const p1 = vi.fn(() => true);
		const p2 = vi.fn(() => true);

		const predicate = any(p1, p2);

		expect(await predicate(req, env, ctx)).toBe(true);
	});

	it('is false if all predicates are false', async ({ req, ctx, env }) => {
		const p1 = vi.fn(() => false);
		const p2 = vi.fn(() => false);

		const predicate = any(p1, p2);

		expect(await predicate(req, env, ctx)).toBe(false);
	});

	it('is true if any predicates are true', async ({ req, ctx, env }) => {
		const p1 = vi.fn(() => false);
		const p2 = vi.fn(() => true);

		const predicate = any(p1, p2);

		expect(await predicate(req, env, ctx)).toBe(true);
	});
});
