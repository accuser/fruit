import { createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { accept } from './accept';

describe('accept', () => {
	beforeEach((context) => {
		context.req = createMockRequest('https://example.com', { headers: { accept: 'application/json' } });
	});

	it('is true if the accept header is empty', ({ ctx, env, req }) => {
		const predicate = accept('application/json');

		expect(predicate(new Request('https://example.com'), env, ctx)).toBe(true);
	});

	it('is true if the accept header matches exactly', ({ ctx, env, req }) => {
		const predicate = accept('application/json');

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is true if the accept header matches wildcard', ({ ctx, env }) => {
		const predicate = accept('application/json');

		const req = new Request('https://example.com', { headers: { accept: '*/*' } });

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is true if the accept header matches partial wildcard', ({ ctx, env }) => {
		const predicate = accept('application/json');

		const req = new Request('https://example.com', { headers: { accept: 'application/*' } });

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is false if the accept header does not match', ({ ctx, env, req }) => {
		const predicate = accept('text/html');

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
