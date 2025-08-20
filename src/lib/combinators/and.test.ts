import { beforeEach, describe, expect, it, vi } from 'vitest';
import { and } from './and';

// Mock the all module
vi.mock('./all', () => ({
	all: vi.fn(),
}));

// Import the mocked function after mocking
import { all } from './all';

describe('and', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to all with the provided predicates', () => {
		const p1 = vi.fn(() => true);
		const p2 = vi.fn(() => true);

		and(p1, p2);

		expect(all).toHaveBeenCalledWith(p1, p2);
	});

	it('returns the result from all', () => {
		const mockResult = vi.fn();

		vi.mocked(all).mockReturnValue(mockResult);

		const p1 = vi.fn();
		const p2 = vi.fn();

		const predicate = and(p1, p2);

		expect(predicate).toBe(mockResult);
	});
});
