import { error } from './error';

export const tooManyRequests = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(429, 'Too Many Requests', reason, init);
