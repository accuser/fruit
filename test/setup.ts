declare module 'vitest' {
	interface TestContext {
		ctx: ExecutionContext;
		env: Env;
		req: Request;
	}
}
