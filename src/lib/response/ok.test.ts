import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./response', () => ({
	response: vi.fn(),
}));

import { ok } from './ok';
import { response } from './response';

describe('ok', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const data of [undefined, null, 'message', { id: 42 }]) {
		it('delegates to response', () => {
			ok(data);

			expect(vi.mocked(response)).toHaveBeenCalledWith(data, { status: 200, statusText: 'OK' });
		});
	}
});
