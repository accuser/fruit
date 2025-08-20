import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { notFound } from './not-found';

describe('notFound', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			notFound(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(404, 'Not Found', reason, undefined);
		});
	}
});
