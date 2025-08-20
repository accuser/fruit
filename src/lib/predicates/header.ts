import type { RequestPredicate } from '$types';

export const header =
	(header: string, value?: string): RequestPredicate =>
	(req) =>
		value === undefined ? req.headers.has(header) : req.headers.get(header) === value;
