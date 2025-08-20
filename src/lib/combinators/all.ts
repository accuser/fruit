import type { RequestPredicate } from '$types';

export const all =
	(...predicates: RequestPredicate[]): RequestPredicate =>
	async (req, env, ctx) => {
		for (const predicate of predicates) {
			const result = await predicate(req, env, ctx);
			if (!result) {
				return false; // Short-circuit on first false
			}
		}
		return true;
	};
