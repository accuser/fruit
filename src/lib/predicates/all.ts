import type { RequestPredicate } from '$types';

export const all =
	(...predicates: RequestPredicate[]): RequestPredicate =>
	(req, env, ctx) =>
		predicates.every((p) => p(req, env, ctx));
