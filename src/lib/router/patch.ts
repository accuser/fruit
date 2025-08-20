import type { RequestHandler } from '$types';
import { match } from './match';

export const patch = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('PATCH', input, handler);
