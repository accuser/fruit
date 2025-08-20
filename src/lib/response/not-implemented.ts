import { error } from './error';

export const notImplemented = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(501, 'Not Implemented', reason, init);
