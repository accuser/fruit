import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { match } from './match';
import { options } from './options';

describe('optionss', () => {
	it('delegates to match', () => {
		options('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('OPTIONS', '/:id', expect.any(Function));
	});
});
