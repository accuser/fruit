import type { RequestHandler } from './request-handler';
import type { RequestPredicate } from './request-predicate';

export type Route<T extends string | URLPatternInit> = [RequestPredicate, RequestHandler<T>];
