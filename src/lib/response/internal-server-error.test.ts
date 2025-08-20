import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { internalServerError } from './internal-server-error';

describe('internalServerError', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			internalServerError(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(500, 'Internal Server Error', reason, undefined);
		});
	}
});
