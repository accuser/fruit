import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { error } from './error';
import { serviceUnavailable } from './service-unavailable';

describe('serviceUnavailable', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			serviceUnavailable(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(503, 'Service Unavailable', reason, undefined);
		});
	}
});
