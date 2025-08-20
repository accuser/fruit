import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./redirect', () => ({
	redirect: vi.fn(),
}));

import { movedPermanently } from './moved-permanently';
import { redirect } from './redirect';

describe('movedPermanently', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const url of ['/path', new URL('https://example.com')]) {
		it('delegates to response', () => {
			movedPermanently(url);

			expect(vi.mocked(redirect)).toHaveBeenCalledWith(url, 301);
		});
	}
});
