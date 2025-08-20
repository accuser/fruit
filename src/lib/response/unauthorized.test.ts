import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { unauthorized } from './unauthorized';

describe('unauthorized', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			unauthorized(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(401, 'Unauthorized', reason, undefined);
		});
	}
});
