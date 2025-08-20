import type { Method, RequestHandler, Route, Router } from '$types';
import { match } from './match';
import { route } from './route';

export const router = () => {
	const routes: Route<string | URLPatternInit>[] = [];

	return new Proxy(route(routes), {
		get: (target, prop, receiver) =>
			target[prop as keyof typeof target] ||
			(typeof prop === 'string'
				? <const T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>): Router => {
						routes.push(match(prop.toUpperCase() as Method, input, handler));
						return receiver as typeof target & Router;
					}
				: undefined),
	}) as unknown as ReturnType<typeof route> & Router;
};
