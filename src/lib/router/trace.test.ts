import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { match } from './match';
import { trace } from './trace';

describe('trace', () => {
	it('delegates to match', () => {
		trace('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('TRACE', '/:id', expect.any(Function));
	});
});
