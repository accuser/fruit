import type { RequestHandler } from '$types';
import { match } from './match';

export const delete_ = <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) =>
	match('DELETE', input, handler);

export { delete_ as delete };
