import type { Method, RequestPredicate } from '$types';

export const method =
	(...methods: Method[]): RequestPredicate =>
	(req) =>
		methods.map((method) => method.toUpperCase()).includes(req.method.toUpperCase());
