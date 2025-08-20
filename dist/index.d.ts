type ExtractPatternParams<T extends string> = T extends `${string}(:${infer Param}+)${infer Rest}` ? {
    [K in Param]: string;
} & ExtractPatternParams<Rest> : T extends `${string}(:${infer Param}*)${infer Rest}` ? {
    [K in Param]: string;
} & ExtractPatternParams<Rest> : T extends `${string}(:${infer Param}?)${infer Rest}` ? {
    [K in Param]: string | undefined;
} & ExtractPatternParams<Rest> : T extends `${string}(:${infer Param})${infer Rest}` ? {
    [K in Param]: string;
} & ExtractPatternParams<Rest> : T extends `${string}:${infer ParamAndRest}` ? ParamAndRest extends `${infer Param}/${infer Rest}` ? {
    [K in Param]: string;
} & ExtractPatternParams<`/${Rest}`> : {
    [K in ParamAndRest]: string;
} : {};

type ExtractOne<S extends string> = S extends `${string}=:${infer Name}+` ? {
    [K in Name]: [string, ...string[]];
} : S extends `${string}=(:${infer Name}+)` ? {
    [K in Name]: [string, ...string[]];
} : S extends `${string}=:${infer Name}*` ? {
    [K in Name]: string[];
} : S extends `${string}=(:${infer Name}*)` ? {
    [K in Name]: string[];
} : S extends `${string}=:${infer Name}?` ? {
    [K in Name]: string | undefined;
} : S extends `${string}=(:${infer Name}?)` ? {
    [K in Name]: string | undefined;
} : S extends `${string}=:${infer Name}` ? {
    [K in Name]: string;
} : S extends `${string}=(:${infer Name})` ? {
    [K in Name]: string;
} : {};
type ExtractSearchParams<T extends string> = T extends `?${infer Rest}` ? ExtractSearchParams<Rest> : T extends `${infer Head}&${infer Tail}` ? ExtractOne<Head> & ExtractSearchParams<Tail> : ExtractOne<T>;

type ExtractURLPatternParams<T extends URLPatternInit> = (T extends {
    protocol: infer Protocol extends string;
} ? ExtractPatternParams<Protocol> : {}) & (T extends {
    username: infer Username extends string;
} ? ExtractPatternParams<Username> : {}) & (T extends {
    password: infer Password extends string;
} ? ExtractPatternParams<Password> : {}) & (T extends {
    hostname: infer Hostname extends string;
} ? ExtractPatternParams<Hostname> : {}) & (T extends {
    port: infer Port extends string;
} ? ExtractPatternParams<Port> : {}) & (T extends {
    pathname: infer Pathname extends string;
} ? ExtractPatternParams<Pathname> : {}) & (T extends {
    search: infer Search extends string;
} ? ExtractSearchParams<Search> : {}) & (T extends {
    hash: infer Hash extends string;
} ? ExtractPatternParams<Hash> : {});

type InferParams<T extends string | URLPatternInit> = T extends URLPatternInit ? ExtractURLPatternParams<T> : T extends string ? ExtractPatternParams<T> : {};

type Method = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';

type MIMETypeName = 'application' | 'audio' | 'example' | 'font' | 'haptics' | 'image' | 'message' | 'model' | 'multipart' | 'text' | 'video';
type MIMEType = `${MIMETypeName}/${string}` | `${MIMETypeName}/*` | '*/*';

type RequestEvent<T extends string | URLPatternInit> = {
    params: InferParams<T>;
    platform: {
        ctx: ExecutionContext;
        env: Env;
    };
    request: Request;
    url: URL;
};

type RequestHandler<T extends string | URLPatternInit> = (event: RequestEvent<T>) => Response | Promise<Response>;

type RequestPredicate = (req: Request, env: Env, ctx: ExecutionContext) => boolean | Promise<boolean>;

type Route<T extends string | URLPatternInit> = [RequestPredicate, RequestHandler<T>];

type Router = {
    [K in Lowercase<Method>]: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => Router;
};

declare const all: (...predicates: RequestPredicate[]) => RequestPredicate;

declare const and: (p1: RequestPredicate, p2: RequestPredicate, ...predicates: RequestPredicate[]) => RequestPredicate;

declare const any: (...predicates: RequestPredicate[]) => RequestPredicate;

declare const or: (p1: RequestPredicate, p2: RequestPredicate, ...predicates: RequestPredicate[]) => RequestPredicate;

declare const accept: (...mimetypes: MIMEType[]) => RequestPredicate;

declare const contentType: (...mimetypes: MIMEType[]) => RequestPredicate;

declare const custom: (predicate: RequestPredicate) => RequestPredicate;

declare const header: (header: string, value?: string) => RequestPredicate;

declare const hostname: (hostname: string) => RequestPredicate;

declare const method: (...methods: Method[]) => RequestPredicate;

declare const never: () => RequestPredicate;

declare const not: (predicate: RequestPredicate) => RequestPredicate;

declare const pass: () => RequestPredicate;

declare const pathname: (pathname: string) => RequestPredicate;

declare const protocol: (protocol: string) => RequestPredicate;

declare const url: <const T extends string | URLPatternInit>(input: T) => RequestPredicate;

declare const response: (data?: unknown, init?: ResponseInit) => Response;

declare const accepted: typeof response;

declare const badGateway: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const badRequest: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const created: typeof response;

declare const error: (status: number, statusText?: string, reason?: string | Error | null | undefined, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const forbidden: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const found: (url: string | URL) => Response;

declare const html: (body?: BodyInit | null, init?: ResponseInit) => Response;

declare const internalServerError: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const json: typeof Response.json;

declare const methodNotAllowed: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const movedPermanently: (url: string | URL) => Response;

declare const noContent: (init?: ResponseInit | undefined) => Response;

declare const notAcceptable: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const notFound: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const notImplemented: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const ok: typeof response;

declare const redirect: typeof Response.redirect;

declare const seeOther: (url: string | URL) => Response;

declare const serviceUnavailable: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const text: (body?: BodyInit | null, init?: ResponseInit) => Response;

declare const tooManyRequests: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const unauthorized: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const unprocessableContent: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const unsupportedMediaType: (reason?: Error | string | null, init?: Omit<ResponseInit, "status" | "statusText">) => Response;

declare const getRequestEvent: () => RequestEvent<any>;

declare const delete_: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const get: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const head: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const match: <const T extends string | URLPatternInit>(method: Method, input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const options: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const patch: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const post: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const put: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

declare const route: (arg: Route<string | URLPatternInit> | Route<string | URLPatternInit>[], ...args: Route<string | URLPatternInit>[]) => {
    fetch: (request: Request<unknown, IncomingRequestCfProperties<unknown>>, env: Env, ctx: ExecutionContext) => Promise<Response>;
};

declare const router: () => ReturnType<typeof route> & Router;

declare const trace: <T extends string | URLPatternInit>(input: T, handler: RequestHandler<T>) => [RequestPredicate, RequestHandler<T>];

export { type ExtractPatternParams, type ExtractSearchParams, type ExtractURLPatternParams, type InferParams, type MIMEType, type Method, type RequestEvent, type RequestHandler, type RequestPredicate, type Route, type Router, accept, accepted, all, and, any, badGateway, badRequest, contentType, created, custom, delete_ as delete, delete_, error, forbidden, found, get, getRequestEvent, head, header, hostname, html, internalServerError, json, match, method, methodNotAllowed, movedPermanently, never, noContent, not, notAcceptable, notFound, notImplemented, ok, options, or, pass, patch, pathname, post, protocol, put, redirect, response, route, router, seeOther, serviceUnavailable, text, tooManyRequests, trace, unauthorized, unprocessableContent, unsupportedMediaType, url };
