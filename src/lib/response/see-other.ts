import { redirect } from './redirect';

export const seeOther = (url: string | URL) => redirect(url, 303);
