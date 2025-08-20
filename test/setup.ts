declare module 'vitest' {
	interface TestContext {
		ctx: ExecutionContext;
		env: Env;
		req: Request<unknown, IncomingRequestCfProperties<unknown>>;
	}
}
