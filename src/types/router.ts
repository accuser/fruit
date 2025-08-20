import type { Method } from './method';
import type { RequestHandler } from './request-handler';

export type Router = {
	[K in Lowercase<Method>]: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => Router;
};
