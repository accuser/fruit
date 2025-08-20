import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { badRequest } from './bad-request';
import { error } from './error';

describe('badRequest', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			badRequest(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(400, 'Bad Request', reason, undefined);
		});
	}
});
