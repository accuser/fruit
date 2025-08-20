import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { redirect } from './redirect';

describe('redirect', () => {
	const GlobalResponse = globalThis.Response;

	beforeAll(() => {
		Response.redirect = vi.fn();
	});

	afterAll(() => {
		globalThis.Response = GlobalResponse;
	});

	it('delegates to Response.redirect', () => {
		redirect('https://example.com');

		expect(vi.mocked(Response.redirect)).toHaveBeenCalledWith('https://example.com', undefined);
	});
});
