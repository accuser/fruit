import { describe, expect, it, vi } from 'vitest';

vi.mock('$lib/predicates', () => ({ and: vi.fn(), method: vi.fn(), pathname: vi.fn(), url: vi.fn() }));

import { and, method, pathname, url } from '$lib/predicates';
import { match } from './match';

describe('match', () => {
	for (const m of ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'] as const) {
		it('should return a route', async () => {
			const route = match(m, '/', vi.fn());

			expect(Array.isArray(route)).toBe(true);
			expect(route.length).toBe(2);
			expect(route[1]).toBeTypeOf('function');
		});

		it('should compose a route matching predicate', () => {
			const route = match(m, '/', vi.fn());

			expect(and).toHaveBeenCalled();
			expect(method).toHaveBeenCalledWith(m);
			expect(pathname).toHaveBeenCalledWith('/');
		});

		it('should match pathnames', () => {
			const route = match(m, '/', vi.fn());

			expect(pathname).toHaveBeenCalledWith('/');
		});

		it('should match URL strings', () => {
			const route = match(m, 'https://example.com/', vi.fn());

			expect(url).toHaveBeenCalledWith('https://example.com/');
		});

		it('should match URLPatternInit', () => {
			const route = match(m, { pathname: '/:id' }, vi.fn());

			expect(url).toHaveBeenCalledWith({ pathname: '/:id' });
		});
	}
});
