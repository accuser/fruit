import { error } from './error';

export const badGateway = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(502, 'Bad Gateway', reason, init);
