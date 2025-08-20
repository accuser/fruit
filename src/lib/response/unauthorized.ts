import { error } from './error';

export const unauthorized = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(401, 'Unauthorized', reason, init);
