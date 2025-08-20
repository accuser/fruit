import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./response', () => ({
	response: vi.fn(),
}));

import { created } from './created';
import { response } from './response';

describe('accepted', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const data of [undefined, null, 'message', { id: 42 }]) {
		it('delegates to response', () => {
			created(data);

			expect(vi.mocked(response)).toHaveBeenCalledWith(data, { status: 201, statusText: 'Created' });
		});
	}
});
