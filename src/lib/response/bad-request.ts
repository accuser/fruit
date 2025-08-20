import { error } from './error';

export const badRequest = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(400, 'Bad Request', reason, init);
