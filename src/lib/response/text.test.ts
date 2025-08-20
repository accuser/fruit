import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { text } from './text';

describe('text', () => {
	const OriginalResponse = globalThis.Response;

	beforeAll(() => {
		globalThis.Response = vi.fn() as any;
	});

	afterAll(() => {
		globalThis.Response = OriginalResponse;
	});

	it('delegates to Response', () => {
		text('Hello, World!');

		expect(vi.mocked(globalThis.Response)).toHaveBeenCalledWith('Hello, World!', {
			headers: { 'Content-Type': 'text/plain' },
		});
	});

	it('preserves text headers', () => {
		text('Hello, World!', { headers: { 'X-Custom-Header': 'value' } });

		expect(vi.mocked(globalThis.Response)).toHaveBeenCalledWith('Hello, World!', {
			headers: {
				'Content-Type': 'text/plain',
				'X-Custom-Header': 'value',
			},
		});
	});
});
