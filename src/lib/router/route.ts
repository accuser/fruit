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
				async () => {
					for (const [predicate, handler] of routes) {
						const matches = await predicate(request, env, ctx);
						if (matches) {
							return handler(getRequestEvent());
						}
					}
					return new Response(null, { status: 404 });
				}
			),
	}) satisfies ExportedHandler<Env>;
