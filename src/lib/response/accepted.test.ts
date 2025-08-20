import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./response', () => ({
	response: vi.fn(),
}));

import { accepted } from './accepted';
import { response } from './response';

describe('accepted', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const data of [undefined, null, 'message', { id: 42 }]) {
		it('delegates to response', () => {
			accepted(data);

			expect(vi.mocked(response)).toHaveBeenCalledWith(data, { status: 202, statusText: 'Accepted' });
		});
	}
});
