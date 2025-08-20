import type { RequestHandler } from '$types';
import { match } from './match';

export const trace = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('TRACE', input, handler);
