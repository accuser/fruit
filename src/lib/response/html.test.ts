import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { html } from './html';

describe('html', () => {
	const OriginalResponse = globalThis.Response;

	beforeAll(() => {
		globalThis.Response = vi.fn() as any;
	});

	afterAll(() => {
		globalThis.Response = OriginalResponse;
	});

	it('delegates to Response', () => {
		html('<p>Hello, World!</p>');

		expect(vi.mocked(globalThis.Response)).toHaveBeenCalledWith('<p>Hello, World!</p>', {
			headers: { 'Content-Type': 'text/html' },
		});
	});

	it('preserves html headers', () => {
		html('<p>Hello, World!</p>', { headers: { 'X-Custom-Header': 'value' } });

		expect(vi.mocked(globalThis.Response)).toHaveBeenCalledWith('<p>Hello, World!</p>', {
			headers: {
				'Content-Type': 'text/html',
				'X-Custom-Header': 'value',
			},
		});
	});
});
