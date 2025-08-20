import { getRequestEvent } from '$lib/router/als';
import type { RequestPredicate } from '$types';

export const url = <const T extends string | URLPatternInit>(input: T): RequestPredicate => {
	const pattern = new URLPattern(input);

	return ({ url }: Request) => {
		const result = pattern.exec(url);

		if (result === null) {
			return false;
		}

		const event = getRequestEvent();

		Object.assign(
			event.params,
			Object.values(result)
				.filter((component) => component?.groups)
				.map((component) => Object.fromEntries(Object.entries(component.groups).filter(([key]) => isNaN(Number(key)))))
		);

		return true;
	};
};
