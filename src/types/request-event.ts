import type { InferParams } from 'src';

export type RequestEvent<T extends string | URLPatternInit> = {
	params: InferParams<T>;
	platform: { ctx: ExecutionContext; env: Env };
	request: Request;
	url: URL;
};
