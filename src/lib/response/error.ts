import { json } from './json';
import { text } from './text';

export const error = (
	status: number,
	statusText?: string,
	reason: string | Error | null | undefined = statusText,
	init?: Omit<ResponseInit, 'status' | 'statusText'>
) =>
	reason
		? json(reason instanceof Error ? reason.message : reason, {
				...init,
				headers: {
					'Content-Type': 'application/problem+json',
					...init?.headers,
				},
				status,
				statusText,
			})
		: text(null, {
				...init,
				headers: {
					'Content-Type': 'text/plain',
					...init?.headers,
				},
				status,
				statusText,
			});
