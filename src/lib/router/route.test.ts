import { createMockHandler, createMockPredicate, createMockRequest } from '$test/mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { route } from './route';

describe('route', () => {
	beforeEach((context) => {
		context.req = createMockRequest();
	});

	it('handles single route as array', async ({ req, env, ctx }) => {
		const predicate = createMockPredicate();
		const handler = createMockHandler(new Response('Single route'));

		const router = route([predicate, handler]);

		const response = await router.fetch(req, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Single route');
		expect(predicate).toHaveBeenCalledWith(req, env, ctx);
		expect(handler).toHaveBeenCalledWith(
			expect.objectContaining({
				request: req,
				url: expect.any(URL),
				params: {},
				platform: { env, ctx },
			})
		);
	});

	it('handles multiple routes as array', async ({ req, env, ctx }) => {
		const predicate1 = createMockPredicate(false);
		const handler1 = createMockHandler(new Response('First route'));
		const predicate2 = createMockPredicate();
		const handler2 = createMockHandler(new Response('Second route'));

		const router = route([
			[predicate1, handler1],
			[predicate2, handler2],
		]);

		const response = await router.fetch(req, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Second route');
		expect(predicate1).toHaveBeenCalledWith(req, env, ctx);
		expect(predicate2).toHaveBeenCalledWith(req, env, ctx);
		expect(handler1).not.toHaveBeenCalled();
		expect(handler2).toHaveBeenCalled();
	});

	it('returns first matching route', async ({ req, env, ctx }) => {
		const predicate1 = createMockPredicate();
		const handler1 = createMockHandler(new Response('First match'));
		const predicate2 = createMockPredicate();
		const handler2 = createMockHandler(new Response('Second match'));

		const router = route([
			[predicate1, handler1],
			[predicate2, handler2],
		]);

		const response = await router.fetch(req, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('First match');
		expect(predicate1).toHaveBeenCalledWith(req, env, ctx);
		expect(predicate2).not.toHaveBeenCalled();
		expect(handler2).not.toHaveBeenCalled();
	});

	it('returns 404 when no routes match', async ({ req, env, ctx }) => {
		const predicate1 = createMockPredicate(false);
		const handler1 = createMockHandler(new Response('First route'));
		const predicate2 = createMockPredicate(false);
		const handler2 = createMockHandler(new Response('Second route'));

		const router = route([
			[predicate1, handler1],
			[predicate2, handler2],
		]);

		const response = await router.fetch(req, env, ctx);

		expect(response.status).toBe(404);
		expect(handler1).not.toHaveBeenCalled();
		expect(handler2).not.toHaveBeenCalled();
	});

	it('handles async predicates', async ({ req, env, ctx }) => {
		const predicate = vi.fn().mockImplementation(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10));
			return true;
		});
		const handler = createMockHandler(new Response('Async predicate'));

		const router = route([[predicate, handler]]);

		const response = await router.fetch(req, env, ctx);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Async predicate');
		expect(predicate).toHaveBeenCalledWith(req, env, ctx);
	});

	it('passes correct URL to handler', async ({ ctx, env }) => {
		const predicate = createMockPredicate();
		const handler = createMockHandler();
		const testUrl = 'https://example.com/test?param=value';

		const router = route([[predicate, handler]]);
		const request = createMockRequest(testUrl);

		await router.fetch(request, env, ctx);

		expect(handler).toHaveBeenCalledWith(
			expect.objectContaining({
				url: new URL(testUrl),
			})
		);
	});

	it('passes empty params object to handler', async ({ req, env, ctx }) => {
		const predicate = createMockPredicate();
		const handler = createMockHandler();

		const router = route([[predicate, handler]]);

		await router.fetch(req, env, ctx);

		expect(handler).toHaveBeenCalledWith(
			expect.objectContaining({
				params: {},
			})
		);
	});

	it('passes platform context to handler', async ({ req, env, ctx }) => {
		const predicate = createMockPredicate();
		const handler = createMockHandler();

		const router = route([[predicate, handler]]);

		await router.fetch(req, env, ctx);

		expect(handler).toHaveBeenCalledWith(
			expect.objectContaining({
				platform: { env, ctx },
			})
		);
	});

	it('handles handler errors', async ({ req, env, ctx }) => {
		const predicate = createMockPredicate();
		const handler = vi.fn().mockRejectedValue(new Error('Handler error'));

		const router = route([[predicate, handler]]);

		await expect(router.fetch(req, env, ctx)).rejects.toThrow('Handler error');
	});

	it('handles predicate errors', async ({ req, env, ctx }) => {
		const predicate = vi.fn().mockRejectedValue(new Error('Predicate error'));
		const handler = createMockHandler();

		const router = route([[predicate, handler]]);

		await expect(router.fetch(req, env, ctx)).rejects.toThrow('Predicate error');
	});
});
