import type { Route } from '$types';
import { als, getRequestEvent } from './als';

export const route = (...routes: Route<string | URLPatternInit>[]) =>
	({
		fetch: async (request, env, ctx) =>
			als.run(
				{
					params: {},
					platform: { ctx, env },
					request,
					url: new URL(request.url),
				},
				() =>
					routes.find(([predicate]) => predicate(request, env, ctx))?.[1](getRequestEvent()) ||
					new Response(null, { status: 404 })
			),
	}) satisfies ExportedHandler<Env>;
