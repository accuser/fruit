import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { tooManyRequests } from './too-many-requests';

describe('tooManyRequests', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			tooManyRequests(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(429, 'Too Many Requests', reason, undefined);
		});
	}
});
