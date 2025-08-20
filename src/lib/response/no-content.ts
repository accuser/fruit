import { response } from './response';

export const noContent = (init?: ResponseInit | undefined) =>
	response(null, { ...init, status: 204, statusText: 'No Content' });
