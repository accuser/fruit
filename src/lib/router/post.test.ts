import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { match } from './match';
import { post } from './post';

describe('post', () => {
	it('delegates to match', () => {
		post('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('POST', '/:id', expect.any(Function));
	});
});
