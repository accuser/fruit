import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { head } from './head';
import { match } from './match';

describe('head', () => {
	it('delegates to match', () => {
		head('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('HEAD', '/:id', expect.any(Function));
	});
});
