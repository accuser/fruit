import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { match } from './match';
import { put } from './put';

describe('put', () => {
	it('delegates to match', () => {
		put('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('PUT', '/:id', expect.any(Function));
	});
});
