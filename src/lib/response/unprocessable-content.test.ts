import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { unprocessableContent } from './unprocessable-content';

describe('unprocessableContent', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			unprocessableContent(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(422, 'Unprocessable Content', reason, undefined);
		});
	}
});
