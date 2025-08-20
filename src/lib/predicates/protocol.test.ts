import { beforeEach, describe, expect, it, vi } from 'vitest';
import { protocol } from './protocol';

vi.mock('./url', () => ({
	url: vi.fn(),
}));

import { url } from './url';

describe('protocol', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to url', () => {
		protocol('https');

		expect(url).toHaveBeenCalledWith({ protocol: 'https' });
	});

	it('returns the result from url', () => {
		const mockResult = vi.fn();

		vi.mocked(url).mockReturnValue(mockResult);

		const p1 = vi.fn();
		const p2 = vi.fn();

		const predicate = protocol('https');

		expect(predicate).toBe(mockResult);
	});
});
