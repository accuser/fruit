import { error } from './error';

export const notFound = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(404, 'Not Found', reason, init);
