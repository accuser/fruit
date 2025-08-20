import type { ExtractPatternParams } from './extract-pattern-params';
import type { ExtractURLPatternParams } from './extract-url-pattern-params';

export type InferParams<T extends string | URLPatternInit> = T extends URLPatternInit
	? ExtractURLPatternParams<T>
	: T extends string
		? ExtractPatternParams<T>
		: {};
