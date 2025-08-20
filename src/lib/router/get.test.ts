import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { get } from './get';
import { match } from './match';

describe('get', () => {
	it('delegates to match', () => {
		get('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('GET', '/:id', expect.any(Function));
	});
});
