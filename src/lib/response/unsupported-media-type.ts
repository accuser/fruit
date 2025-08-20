import { error } from './error';

export const unsupportedMediaType = (
	reason?: Error | string | null,
	init?: Omit<ResponseInit, 'status' | 'statusText'>
) => error(415, 'Unsupported Media Type', reason, init);
