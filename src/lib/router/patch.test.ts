import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { match } from './match';
import { patch } from './patch';

describe('patch', () => {
	it('delegates to match', () => {
		patch('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('PATCH', '/:id', expect.any(Function));
	});
});
