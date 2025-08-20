import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./redirect', () => ({
	redirect: vi.fn(),
}));

import { found } from './found';
import { redirect } from './redirect';

describe('found', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const url of ['/path', new URL('https://example.com')]) {
		it('delegates to response', () => {
			found(url);

			expect(vi.mocked(redirect)).toHaveBeenCalledWith(url, 302);
		});
	}
});
