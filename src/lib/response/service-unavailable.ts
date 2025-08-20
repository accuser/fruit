import { error } from './error';

export const serviceUnavailable = (
	reason?: Error | string | null,
	init?: Omit<ResponseInit, 'status' | 'statusText'>
) => error(503, 'Service Unavailable', reason, init);
