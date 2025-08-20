import type { RequestPredicate } from '$types';

export const not =
	(predicate: RequestPredicate): RequestPredicate =>
	(req, env, ctx) =>
		!predicate(req, env, ctx);
