import { response } from './response';

export const ok: typeof response = (data, init) => response(data, { ...init, status: 200, statusText: 'OK' });
