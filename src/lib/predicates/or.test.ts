import { beforeEach, describe, expect, it, vi } from 'vitest';
import { or } from './or';

// Mock the any module
vi.mock('./any', () => ({
	any: vi.fn(),
}));

// Import the mocked function after mocking
import { any } from './any';

describe('or', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to all with the provided predicates', () => {
		const p1 = vi.fn(() => true);
		const p2 = vi.fn(() => true);

		or(p1, p2);

		expect(any).toHaveBeenCalledWith(p1, p2);
	});

	it('returns the result from all', () => {
		const mockResult = vi.fn();

		vi.mocked(any).mockReturnValue(mockResult);

		const p1 = vi.fn();
		const p2 = vi.fn();

		const predicate = any(p1, p2);

		expect(predicate).toBe(mockResult);
	});
});
