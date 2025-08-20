import * as p from '$lib/predicates';
import type { Method, RequestHandler, Route } from '$types';

type Match = <const T extends string | URLPatternInit>(
	method: Method,
	input: T,
	handler: RequestHandler<T>
) => Route<T>;

export const match = ((method, input, handler) => [
	p.and(
		p.method(method),
		typeof input === 'string' && URL.canParse(input) === false ? p.pathname(input) : p.url(input)
	),
	handler,
]) satisfies Match;
