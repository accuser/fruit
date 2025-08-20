import { redirect } from './redirect';

export const found = (url: string | URL) => redirect(url, 302);
