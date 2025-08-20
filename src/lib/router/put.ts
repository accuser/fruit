import type { RequestHandler } from '$types';
import { match } from './match';

export const put = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('PUT', input, handler);
