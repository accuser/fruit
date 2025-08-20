import { createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { contentType } from './content-type';

describe('contentType', () => {
	beforeEach((context) => {
		context.req = createMockRequest('https://example.com', { headers: { 'content-type': 'application/json' } });
	});

	it('is true if the content-type header is empty', ({ ctx, env, req }) => {
		const predicate = contentType('application/json');

		expect(predicate(createMockRequest('https://example.com'), env, ctx)).toBe(true);
	});
	it('is true if the content-type header matches', ({ ctx, env, req }) => {
		const predicate = contentType('application/json');

		expect(predicate(req, env, ctx)).toBe(true);
	});

	it('is false if the content-type header does not match', ({ ctx, env, req }) => {
		const predicate = contentType('text/html');

		expect(predicate(req, env, ctx)).toBe(false);
	});
});
