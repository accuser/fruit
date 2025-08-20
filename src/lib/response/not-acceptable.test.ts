import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { notAcceptable } from './not-acceptable';

describe('notAcceptable', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			notAcceptable(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(406, 'Not Acceptable', reason, undefined);
		});
	}
});
