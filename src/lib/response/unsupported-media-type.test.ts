import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { unsupportedMediaType } from './unsupported-media-type';

describe('unsupportedMediaType', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			unsupportedMediaType(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(415, 'Unsupported Media Type', reason, undefined);
		});
	}
});
