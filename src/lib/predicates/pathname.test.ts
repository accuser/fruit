import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pathname } from './pathname';

vi.mock('./url', () => ({
	url: vi.fn(),
}));

import { url } from './url';

describe('pathname', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to url', () => {
		pathname('/example');

		expect(url).toHaveBeenCalledWith({ pathname: '/example' });
	});

	it('returns the result from url', () => {
		const mockResult = vi.fn();

		vi.mocked(url).mockReturnValue(mockResult);

		const p1 = vi.fn();
		const p2 = vi.fn();

		const predicate = pathname('/example');

		expect(predicate).toBe(mockResult);
	});
});
