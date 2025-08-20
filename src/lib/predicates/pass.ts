import type { RequestPredicate } from '$types';

export const pass = (): RequestPredicate => () => true;
