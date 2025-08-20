import type { RequestEvent } from './request-event';

export type RequestHandler<T extends string | URLPatternInit> = (
	event: RequestEvent<T>
) => Response | Promise<Response>;
