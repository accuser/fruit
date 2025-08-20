import type { RequestPredicate } from '$types';
import { all } from './all';

export const and = (p1: RequestPredicate, p2: RequestPredicate, ...predicates: RequestPredicate[]) =>
	all(p1, p2, ...predicates);
