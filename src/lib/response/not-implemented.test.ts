import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { notImplemented } from './not-implemented';

describe('notImplemented', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			notImplemented(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(501, 'Not Implemented', reason, undefined);
		});
	}
});
