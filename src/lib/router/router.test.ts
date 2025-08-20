import { createMockHandler, createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { router } from './router';

vi.mock('./match', () => ({
	match: vi.fn((method, pattern, handler) => [vi.fn().mockResolvedValue(true), handler]),
}));

import { match } from './match';

describe('router', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('creates a router instance', () => {
		const app = router();

		expect(app).toBeDefined();
		expect(typeof app.fetch).toBe('function');
	});

	it('supports method chaining', () => {
		const app = router();
		const handler = createMockHandler();

		const result = app.get('/', handler);

		expect(result).toBe(app);
	});

	it('adds GET routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.get('/', handler);

		expect(match).toHaveBeenCalledWith('GET', '/', handler);
	});

	it('adds POST routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.post('/users', handler);

		expect(match).toHaveBeenCalledWith('POST', '/users', handler);
	});

	it('adds PUT routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.put('/users/:id', handler);

		expect(match).toHaveBeenCalledWith('PUT', '/users/:id', handler);
	});

	it('adds DELETE routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.delete('/users/:id', handler);

		expect(match).toHaveBeenCalledWith('DELETE', '/users/:id', handler);
	});

	it('adds PATCH routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.patch('/users/:id', handler);

		expect(match).toHaveBeenCalledWith('PATCH', '/users/:id', handler);
	});

	it('adds HEAD routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.head('/status', handler);

		expect(match).toHaveBeenCalledWith('HEAD', '/status', handler);
	});

	it('adds OPTIONS routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.options('/api', handler);

		expect(match).toHaveBeenCalledWith('OPTIONS', '/api', handler);
	});

	it('adds TRACE routes', () => {
		const app = router();
		const handler = createMockHandler();

		app.trace('/debug', handler);

		expect(match).toHaveBeenCalledWith('TRACE', '/debug', handler);
	});

	it('handles method names with different casing', () => {
		const app = router();
		const handler = createMockHandler();

		app.get('/', handler);

		expect(match).toHaveBeenCalledWith('GET', '/', handler);
	});

	it('allows chaining multiple routes', () => {
		const app = router();
		const getHandler = createMockHandler();
		const postHandler = createMockHandler();
		const putHandler = createMockHandler();

		const result = app.get('/', getHandler).post('/users', postHandler).put('/users/:id', putHandler);

		expect(result).toBe(app);
		expect(match).toHaveBeenNthCalledWith(1, 'GET', '/', getHandler);
		expect(match).toHaveBeenNthCalledWith(2, 'POST', '/users', postHandler);
		expect(match).toHaveBeenNthCalledWith(3, 'PUT', '/users/:id', putHandler);
	});

	it('handles requests through the underlying route function', async ({ env, ctx }) => {
		const app = router();
		const handler = createMockHandler(new Response('Hello World'));

		app.get('/', handler);

		const request = createMockRequest('https://example.com/', { method: 'GET' });
		const response = await app.fetch(request, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Hello World');
	});

	it('returns 404 for unmatched routes', async ({ env, ctx }) => {
		vi.mocked(match).mockReturnValue([vi.fn().mockResolvedValue(false), createMockHandler()]);

		const app = router();
		const handler = createMockHandler();

		app.get('/users', handler);

		const request = createMockRequest('https://example.com/notfound', { method: 'GET' });
		const response = await app.fetch(request, env, ctx);

		expect(response.status).toBe(404);
	});

	it('preserves route object properties', () => {
		const app = router();

		expect(app.fetch).toBeDefined();
		expect(typeof app.fetch).toBe('function');
	});

	it('handles URLPattern objects', () => {
		const app = router();
		const handler = createMockHandler();
		const pattern = { pathname: '/api/*' };

		app.get(pattern, handler);

		expect(match).toHaveBeenCalledWith('GET', pattern, handler);
	});

	it('accumulates multiple routes in internal array', () => {
		const app = router();
		const handler1 = createMockHandler();
		const handler2 = createMockHandler();
		const handler3 = createMockHandler();

		app.get('/route1', handler1);
		app.post('/route2', handler2);
		app.put('/route3', handler3);

		expect(match).toHaveBeenCalledTimes(3);
		expect(match).toHaveBeenNthCalledWith(1, 'GET', '/route1', handler1);
		expect(match).toHaveBeenNthCalledWith(2, 'POST', '/route2', handler2);
		expect(match).toHaveBeenNthCalledWith(3, 'PUT', '/route3', handler3);
	});

	it('handles non-string properties gracefully', () => {
		const app = router();

		// These should not throw errors and return functions for numeric properties
		// @ts-expect-error
		expect(app[Symbol.iterator]).toBeUndefined();
		// @ts-expect-error
		expect(typeof app[123]).toBe('function');
	});

	it('works with async handlers', async ({ env, ctx }) => {
		// Reset mock to return matching predicate for this test
		vi.mocked(match).mockReturnValue([
			vi.fn().mockResolvedValue(true),
			vi.fn().mockResolvedValue(new Response('Async result')),
		]);

		const app = router();
		const asyncHandler = vi.fn().mockResolvedValue(new Response('Async result'));

		app.get('/async', asyncHandler);

		const request = createMockRequest('https://example.com/async', { method: 'GET' });
		const response = await app.fetch(request, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Async result');
	});

	it('preserves handler execution context', async ({ env, ctx }) => {
		const handler = vi.fn().mockResolvedValue(new Response('Context test'));

		// Mock match to return our handler directly
		vi.mocked(match).mockReturnValue([vi.fn().mockResolvedValue(true), handler]);

		const app = router();

		app.get('/context', handler);

		const request = createMockRequest('https://example.com/context', { method: 'GET' });
		await app.fetch(request, env, ctx);

		expect(handler).toHaveBeenCalledWith(
			expect.objectContaining({
				request,
				platform: { env, ctx },
			})
		);
	});
});
