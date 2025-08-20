import { error } from './error';

export const forbidden = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(403, 'Forbidden', reason, init);
