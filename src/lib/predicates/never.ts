import type { RequestPredicate } from '$types';

export const never = (): RequestPredicate => () => false;
