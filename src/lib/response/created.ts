import { response } from './response';

export const created: typeof response = (data, init) => response(data, { ...init, status: 201, statusText: 'Created' });
