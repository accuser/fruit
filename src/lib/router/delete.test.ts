import { describe, expect, it, vi } from 'vitest';

vi.mock('./match', () => ({ match: vi.fn() }));

import { delete as delete_ } from './delete';
import { match } from './match';
describe('delete', () => {
	it('delegates to match', () => {
		delete_('/:id', vi.fn());
		expect(match).toHaveBeenCalledWith('DELETE', '/:id', expect.any(Function));
	});
});
