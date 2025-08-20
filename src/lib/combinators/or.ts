import type { RequestPredicate } from '$types';
import { any } from './any';

export const or = (p1: RequestPredicate, p2: RequestPredicate, ...predicates: RequestPredicate[]) =>
	any(p1, p2, ...predicates);
