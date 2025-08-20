import type { RequestEvent } from 'src';
import { vi } from 'vitest';

export const createMockHandler = (response = new Response('OK')) => vi.fn().mockResolvedValue(response);

export const createMockPredicate = (matches = true) => vi.fn().mockResolvedValue(matches);

export const createMockRequest = (
	input: URL | RequestInfo = 'https://example.com',
	init: RequestInit = { method: 'GET' }
) => new Request(input, init) as Request<unknown, IncomingRequestCfProperties<unknown>>;

export const createMockRequestEvent = <T extends string | URLPatternInit>(url: string | URL = 'https://example.com') =>
	({
		params: {},
		platform: { env: {}, ctx: {} },
		request: new Request(url),
		url: new URL(url),
	}) as RequestEvent<T>;
