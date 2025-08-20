import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./json', () => ({
	json: vi.fn(),
}));

import { json } from './json';
import { response } from './response';

describe('response', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	for (const data of [null, 'message', new Error('error')]) {
		it('delegates to json', () => {
			response(data);
			expect(vi.mocked(json)).toHaveBeenCalled();
		});
	}

	for (const data of [undefined]) {
		it('does not delegate to json', () => {
			response(data);
			expect(vi.mocked(json)).not.toHaveBeenCalled();
		});
	}
});
