import type { Route } from '$types';
import { als, getRequestEvent } from './als';

function isRoute(
	arg: Route<string | URLPatternInit> | Route<string | URLPatternInit>[]
): arg is Route<string | URLPatternInit> {
	return Array.isArray(arg) && typeof arg[0] === 'function';
}

export const route = ((arg, ...args) => {
	const routes = isRoute(arg) ? [arg, ...args] : arg;

	return {
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
	} satisfies ExportedHandler<Env>;
}) satisfies {
	(routes: Route<string | URLPatternInit>[]): ExportedHandler<Env>;
	(...routes: Route<string | URLPatternInit>[]): ExportedHandler<Env>;
};
