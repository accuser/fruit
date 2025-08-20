import type { RequestPredicate } from '$types';

export const any =
	(...predicates: RequestPredicate[]): RequestPredicate =>
	async (req, env, ctx) => {
		for (const predicate of predicates) {
			const result = await predicate(req, env, ctx);
			if (result) {
				return true;
			}
		}
		return false;
	};
