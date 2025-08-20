import type { RequestPredicate } from '$types';

export const any =
	(...predicates: RequestPredicate[]): RequestPredicate =>
	(req, env, ctx) =>
		predicates.some((p) => p(req, env, ctx));
