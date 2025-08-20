import type { RequestHandler } from '$types';
import { match } from './match';

export const get = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('GET', input, handler);
