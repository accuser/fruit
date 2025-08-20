import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./response', () => ({
	response: vi.fn(),
}));

import { noContent } from './no-content';
import { response } from './response';

describe('noContent', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to response', () => {
		noContent();

		expect(vi.mocked(response)).toHaveBeenCalledWith(null, { status: 204, statusText: 'No Content' });
	});
});
