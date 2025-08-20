import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { methodNotAllowed } from './method-not-allowed';

describe('methodNotAllowed', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			methodNotAllowed(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(405, 'Method Not Allowed', reason, undefined);
		});
	}
});
