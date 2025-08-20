import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./json', () => ({
	json: vi.fn(),
}));

vi.mock('./text', () => ({
	text: vi.fn(),
}));

import { error } from './error';
import { json } from './json';
import { text } from './text';

describe('error', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('delegates to json if reason is not provided', () => {
		error(500, 'Internal Server Error');

		expect(vi.mocked(json)).toHaveBeenCalledWith('Internal Server Error', {
			headers: { 'Content-Type': 'application/problem+json' },
			status: 500,
			statusText: 'Internal Server Error',
		});
	});

	it('delegates to json if reason is a string', () => {
		error(500, 'Internal Server Error', 'message');

		expect(vi.mocked(json)).toHaveBeenCalledWith('message', {
			headers: { 'Content-Type': 'application/problem+json' },
			status: 500,
			statusText: 'Internal Server Error',
		});
	});

	it('delegates to json if reason is an Error', () => {
		error(500, 'Internal Server Error', new Error('message'));

		expect(vi.mocked(json)).toHaveBeenCalledWith('message', {
			headers: { 'Content-Type': 'application/problem+json' },
			status: 500,
			statusText: 'Internal Server Error',
		});
	});

	it('delegates to text if reason is null', () => {
		error(500, 'Internal Server Error', null);

		expect(vi.mocked(text)).toHaveBeenCalledWith(null, {
			headers: {
				'Content-Type': 'text/plain',
			},
			status: 500,
			statusText: 'Internal Server Error',
		});
	});

	it('preserves json headers', () => {
		error(500, 'Internal Server Error', undefined, { headers: { 'X-Custom-Header': 'value' } });

		expect(vi.mocked(json)).toHaveBeenCalledWith('Internal Server Error', {
			headers: {
				'Content-Type': 'application/problem+json',
				'X-Custom-Header': 'value',
			},
			status: 500,
			statusText: 'Internal Server Error',
		});
	});

	it('preserves text headers', () => {
		error(500, 'Internal Server Error', null, { headers: { 'X-Custom-Header': 'value' } });

		expect(vi.mocked(text)).toHaveBeenCalledWith(null, {
			headers: {
				'Content-Type': 'text/plain',
				'X-Custom-Header': 'value',
			},
			status: 500,
			statusText: 'Internal Server Error',
		});
	});
});
