import { getRequestEvent } from '$lib/router/als';
import type { RequestPredicate } from '$types';

const isComponentResult = (input: unknown): input is URLPatternComponentResult =>
	typeof input === 'object' &&
	typeof (input as URLPatternComponentResult).input === 'string' &&
	typeof (input as URLPatternComponentResult).groups === 'object';

export const url = <const T extends string | URLPatternInit>(input: T): RequestPredicate => {
	const pattern = new URLPattern(input);

	return ({ url }: Request) => {
		const result = pattern.exec(url);

		if (result === null) {
			return false;
		}

		const params = Object.values(result)
			.filter(isComponentResult)
			.reduce(
				(acc, { groups }) => {
					Object.entries(groups).forEach(([key, value]) => {
						if (
							isNaN(Number(key)) === false ||
							typeof key !== 'string' ||
							key.startsWith('__') ||
							['constructor', 'prototype'].includes(key)
						) {
							return;
						}
						acc[key] = value.slice(0, 1000);
					});
					return acc;
				},
				{} as Record<string, string>
			);

		Object.assign(getRequestEvent(), { params });

		return true;
	};
};
