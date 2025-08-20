import type { RequestHandler } from '$types';
import { match } from './match';

export const options = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('OPTIONS', input, handler);
