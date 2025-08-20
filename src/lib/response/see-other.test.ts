import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./redirect', () => ({
	redirect: vi.fn(),
}));

import { redirect } from './redirect';
import { seeOther } from './see-other';

describe('seeOther', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const url of ['/path', new URL('https://example.com')]) {
		it('delegates to response', () => {
			seeOther(url);

			expect(vi.mocked(redirect)).toHaveBeenCalledWith(url, 303);
		});
	}
});
