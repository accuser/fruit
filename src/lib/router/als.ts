import type { RequestEvent } from '$types';
import { AsyncLocalStorage } from 'node:async_hooks';

export const als = new AsyncLocalStorage<RequestEvent<any>>();

export const getRequestEvent = () => {
	const event = als.getStore();

	if (event === undefined || event === null)
		throw new Error('getRequestEvent can only be called within a route handler');

	return event;
};
