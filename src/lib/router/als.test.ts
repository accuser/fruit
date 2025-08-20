import type { RequestEvent } from '$types';
import { describe, expect, it } from 'vitest';
import { als, getRequestEvent } from './als';

describe('als', () => {
	it('should throw if getRequestEvent is called outside ALS context', () => {
		expect(() => getRequestEvent()).toThrow('getRequestEvent can only be called within a route handler');
	});

	it('should return the event if called inside ALS context', () => {
		const event = {};
		let result: RequestEvent<string | URLPatternInit> | undefined;

		als.run(event as RequestEvent<string | URLPatternInit>, () => {
			result = getRequestEvent();
		});

		expect(result).toBe(event);
	});
});
