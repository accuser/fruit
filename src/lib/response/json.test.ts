import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { json } from './json';

describe('json', () => {
	const GlobalResponse = globalThis.Response;

	beforeAll(() => {
		Response.json = vi.fn();
	});

	afterAll(() => {
		globalThis.Response = GlobalResponse;
	});

	it('delegates to Response.json', () => {
		json({ message: 'Hello, world!' });

		expect(vi.mocked(Response.json)).toHaveBeenCalledWith({ message: 'Hello, world!' }, undefined);
	});

	it('preserves json headers', () => {
		json({ message: 'Hello, world!' }, { headers: { 'X-Custom-Header': 'value' } });

		expect(vi.mocked(Response.json)).toHaveBeenCalledWith(
			{ message: 'Hello, world!' },
			{
				headers: {
					'X-Custom-Header': 'value',
				},
			}
		);
	});
});
