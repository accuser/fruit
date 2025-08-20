import { beforeEach, describe, expect, it, vi } from 'vitest';
import { hostname } from './hostname';

vi.mock('./url', () => ({
	url: vi.fn(),
}));

import { url } from './url';

describe('hostname', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to url', () => {
		hostname('example.com');

		expect(url).toHaveBeenCalledWith({ hostname: 'example.com' });
	});

	it('returns the result from url', () => {
		const mockResult = vi.fn();

		vi.mocked(url).mockReturnValue(mockResult);

		const p1 = vi.fn();
		const p2 = vi.fn();

		const predicate = hostname('example.com');

		expect(predicate).toBe(mockResult);
	});
});
