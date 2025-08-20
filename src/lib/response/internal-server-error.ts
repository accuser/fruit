import { error } from './error';

export const internalServerError = (
	reason?: Error | string | null,
	init?: Omit<ResponseInit, 'status' | 'statusText'>
) => error(500, 'Internal Server Error', reason, init);
