import { error } from './error';

export const unprocessableContent = (
	reason?: Error | string | null,
	init?: Omit<ResponseInit, 'status' | 'statusText'>
) => error(422, 'Unprocessable Content', reason, init);
