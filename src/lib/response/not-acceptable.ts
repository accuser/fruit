import { error } from './error';

export const notAcceptable = (reason?: Error | string | null, init?: Omit<ResponseInit, 'status' | 'statusText'>) =>
	error(406, 'Not Acceptable', reason, init);
