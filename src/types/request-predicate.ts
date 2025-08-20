export type RequestPredicate = (req: Request, env: Env, ctx: ExecutionContext) => boolean | Promise<boolean>;
