import type { Method, RequestHandler, Route, Router } from '$types';
import { als, getRequestEvent } from './als';
import { match } from './match';

export const router = () => {
	const routes: Route<string | URLPatternInit>[] = [];

	return new Proxy(
		{
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
		} satisfies ExportedHandler<Env>,
		{
			get: (target, prop, receiver) =>
				target[prop as keyof typeof target] ||
				(typeof prop === 'string'
					? <const T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>): Router => {
							routes.push(match(prop.toUpperCase() as Method, input, handler));
							return receiver;
						}
					: undefined),
		}
	) as unknown as Router;
};
