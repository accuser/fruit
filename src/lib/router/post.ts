import type { RequestHandler } from '$types';
import { match } from './match';

export const post = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('POST', input, handler);
