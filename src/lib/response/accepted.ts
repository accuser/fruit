import { response } from './response';

export const accepted: typeof response = (data, init) =>
	response(data, { ...init, status: 202, statusText: 'Accepted' });
