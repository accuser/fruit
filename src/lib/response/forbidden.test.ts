import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { forbidden } from './forbidden';

describe('forbidden', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			forbidden(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(403, 'Forbidden', reason, undefined);
		});
	}
});
