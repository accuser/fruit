import { error } from './error';

export const methodNotAllowed = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(405, 'Method Not Allowed', reason, init);
