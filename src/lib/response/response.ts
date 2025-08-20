import { json } from './json';

export const response = (data?: unknown, init?: ResponseInit) =>
	data === undefined ? new Response(null, init) : json(data, init);
