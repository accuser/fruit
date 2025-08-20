import { redirect } from './redirect';

export const movedPermanently = (url: string | URL) => redirect(url, 301);
