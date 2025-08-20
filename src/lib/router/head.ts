import type { RequestHandler } from '$types';
import { match } from './match';

export const head = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('HEAD', input, handler);
