import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./error', () => ({
	error: vi.fn(),
}));

import { badGateway } from './bad-gateway';
import { error } from './error';

describe('badGateway', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const reason of [undefined, null, 'message', new Error('error')]) {
		it('delegates to error', () => {
			badGateway(reason);

			expect(vi.mocked(error)).toHaveBeenCalledWith(502, 'Bad Gateway', reason, undefined);
		});
	}
});
