// src/lib/combinators/all.ts
var all = (...predicates) => async (req, env, ctx) => {
  for (const predicate of predicates) {
    const result = await predicate(req, env, ctx);
    if (!result) {
      return false;
    }
  }
  return true;
};

// src/lib/combinators/and.ts
var and = (p1, p2, ...predicates) => all(p1, p2, ...predicates);

// src/lib/combinators/any.ts
var any = (...predicates) => async (req, env, ctx) => {
  for (const predicate of predicates) {
    const result = await predicate(req, env, ctx);
    if (result) {
      return true;
    }
  }
  return false;
};

// src/lib/combinators/or.ts
var or = (p1, p2, ...predicates) => any(p1, p2, ...predicates);

// src/lib/predicates/accept.ts
var accept = (...mimetypes) => ({ headers }) => (headers.get("Accept") ?? "*/*").split(",").map((type) => type.trim().split(";")[0]).some(
  (acceptType) => acceptType === "*/*" || mimetypes.includes(acceptType) || mimetypes.some((mimeType) => acceptType === `${mimeType.split("/")[0]}/*`)
);

// src/lib/predicates/content-type.ts
var contentType = (...mimetypes) => ({ headers }) => (headers.get("Content-Type") ?? "*/*").split(",").map((type) => type.trim().split(";")[0]).some((contentType2) => contentType2 === "*/*" || mimetypes.includes(contentType2));

// src/lib/predicates/custom.ts
var custom = (predicate) => predicate;

// src/lib/predicates/header.ts
var header = (header2, value) => (req) => value === void 0 ? req.headers.has(header2) : req.headers.get(header2) === value;

// src/lib/router/als.ts
import { AsyncLocalStorage } from "async_hooks";
var als = new AsyncLocalStorage();
var getRequestEvent = () => {
  const event = als.getStore();
  if (event === void 0 || event === null)
    throw new Error("getRequestEvent can only be called within a route handler");
  return event;
};

// src/lib/predicates/url.ts
var isComponentResult = (input) => typeof input === "object" && typeof input.input === "string" && typeof input.groups === "object";
var url = (input) => {
  const pattern = new URLPattern(input);
  return ({ url: url2 }) => {
    const result = pattern.exec(url2);
    if (result === null) {
      return false;
    }
    const params = Object.values(result).filter(isComponentResult).reduce(
      (acc, { groups }) => {
        Object.entries(groups).forEach(([key, value]) => {
          if (isNaN(Number(key)) === false || typeof key !== "string" || key.startsWith("__") || ["constructor", "prototype"].includes(key)) {
            return;
          }
          acc[key] = value.slice(0, 1e3);
        });
        return acc;
      },
      {}
    );
    Object.assign(getRequestEvent(), { params });
    return true;
  };
};

// src/lib/predicates/hostname.ts
var hostname = (hostname2) => url({ hostname: hostname2 });

// src/lib/predicates/method.ts
var method = (...methods) => (req) => methods.map((method2) => method2.toUpperCase()).includes(req.method.toUpperCase());

// src/lib/predicates/never.ts
var never = () => () => false;

// src/lib/predicates/not.ts
var not = (predicate) => (req, env, ctx) => !predicate(req, env, ctx);

// src/lib/predicates/pass.ts
var pass = () => () => true;

// src/lib/predicates/pathname.ts
var pathname = (pathname2) => url({ pathname: pathname2 });

// src/lib/predicates/protocol.ts
var protocol = (protocol2) => url({ protocol: protocol2 });

// src/lib/response/json.ts
var json = (data, init) => Response.json(data, init);

// src/lib/response/response.ts
var response = (data, init) => data === void 0 ? new Response(null, init) : json(data, init);

// src/lib/response/accepted.ts
var accepted = (data, init) => response(data, { ...init, status: 202, statusText: "Accepted" });

// src/lib/response/text.ts
var text = (body, init) => new Response(body, { ...init, headers: { "Content-Type": "text/plain", ...init?.headers } });

// src/lib/response/error.ts
var error = (status, statusText, reason = statusText, init) => reason ? json(reason instanceof Error ? reason.message : reason, {
  ...init,
  headers: {
    "Content-Type": "application/problem+json",
    ...init?.headers
  },
  status,
  statusText
}) : text(null, {
  ...init,
  headers: {
    "Content-Type": "text/plain",
    ...init?.headers
  },
  status,
  statusText
});

// src/lib/response/bad-gateway.ts
var badGateway = (reason, init) => error(502, "Bad Gateway", reason, init);

// src/lib/response/bad-request.ts
var badRequest = (reason, init) => error(400, "Bad Request", reason, init);

// src/lib/response/created.ts
var created = (data, init) => response(data, { ...init, status: 201, statusText: "Created" });

// src/lib/response/forbidden.ts
var forbidden = (reason, init) => error(403, "Forbidden", reason, init);

// src/lib/response/redirect.ts
var redirect = (url2, status) => Response.redirect(url2, status);

// src/lib/response/found.ts
var found = (url2) => redirect(url2, 302);

// src/lib/response/html.ts
var html = (body, init) => new Response(body, { ...init, headers: { "Content-Type": "text/html", ...init?.headers } });

// src/lib/response/internal-server-error.ts
var internalServerError = (reason, init) => error(500, "Internal Server Error", reason, init);

// src/lib/response/method-not-allowed.ts
var methodNotAllowed = (reason, init) => error(405, "Method Not Allowed", reason, init);

// src/lib/response/moved-permanently.ts
var movedPermanently = (url2) => redirect(url2, 301);

// src/lib/response/no-content.ts
var noContent = (init) => response(null, { ...init, status: 204, statusText: "No Content" });

// src/lib/response/not-acceptable.ts
var notAcceptable = (reason, init) => error(406, "Not Acceptable", reason, init);

// src/lib/response/not-found.ts
var notFound = (reason, init) => error(404, "Not Found", reason, init);

// src/lib/response/not-implemented.ts
var notImplemented = (reason, init) => error(501, "Not Implemented", reason, init);

// src/lib/response/ok.ts
var ok = (data, init) => response(data, { ...init, status: 200, statusText: "OK" });

// src/lib/response/see-other.ts
var seeOther = (url2) => redirect(url2, 303);

// src/lib/response/service-unavailable.ts
var serviceUnavailable = (reason, init) => error(503, "Service Unavailable", reason, init);

// src/lib/response/too-many-requests.ts
var tooManyRequests = (reason, init) => error(429, "Too Many Requests", reason, init);

// src/lib/response/unauthorized.ts
var unauthorized = (reason, init) => error(401, "Unauthorized", reason, init);

// src/lib/response/unprocessable-content.ts
var unprocessableContent = (reason, init) => error(422, "Unprocessable Content", reason, init);

// src/lib/response/unsupported-media-type.ts
var unsupportedMediaType = (reason, init) => error(415, "Unsupported Media Type", reason, init);

// src/lib/router/match.ts
var match = ((method2, input, handler) => [
  and(
    method(method2),
    typeof input === "string" && URL.canParse(input) === false ? pathname(input) : url(input)
  ),
  handler
]);

// src/lib/router/delete.ts
var delete_ = (input, handler) => match("DELETE", input, handler);

// src/lib/router/get.ts
var get = (input, handler) => match("GET", input, handler);

// src/lib/router/head.ts
var head = (input, handler) => match("HEAD", input, handler);

// src/lib/router/options.ts
var options = (input, handler) => match("OPTIONS", input, handler);

// src/lib/router/patch.ts
var patch = (input, handler) => match("PATCH", input, handler);

// src/lib/router/post.ts
var post = (input, handler) => match("POST", input, handler);

// src/lib/router/put.ts
var put = (input, handler) => match("PUT", input, handler);

// src/lib/router/route.ts
function isRoute(arg) {
  return Array.isArray(arg) && typeof arg[0] === "function";
}
var route = ((arg, ...args) => {
  const routes = isRoute(arg) ? [arg, ...args] : arg;
  return {
    fetch: async (request, env, ctx) => als.run(
      {
        params: {},
        platform: { ctx, env },
        request,
        url: new URL(request.url)
      },
      async () => {
        for (const [predicate, handler] of routes) {
          const matches = await predicate(request, env, ctx);
          if (matches) {
            return handler(getRequestEvent());
          }
        }
        return new Response(null, { status: 404 });
      }
    )
  };
});

// src/lib/router/router.ts
var router = () => {
  const routes = [];
  return new Proxy(route(routes), {
    get: (target, prop, receiver) => target[prop] || (typeof prop === "string" ? (input, handler) => {
      routes.push(match(prop.toUpperCase(), input, handler));
      return receiver;
    } : void 0)
  });
};

// src/lib/router/trace.ts
var trace = (input, handler) => match("TRACE", input, handler);
export {
  accept,
  accepted,
  all,
  and,
  any,
  badGateway,
  badRequest,
  contentType,
  created,
  custom,
  delete_ as delete,
  delete_,
  error,
  forbidden,
  found,
  get,
  getRequestEvent,
  head,
  header,
  hostname,
  html,
  internalServerError,
  json,
  match,
  method,
  methodNotAllowed,
  movedPermanently,
  never,
  noContent,
  not,
  notAcceptable,
  notFound,
  notImplemented,
  ok,
  options,
  or,
  pass,
  patch,
  pathname,
  post,
  protocol,
  put,
  redirect,
  response,
  route,
  router,
  seeOther,
  serviceUnavailable,
  text,
  tooManyRequests,
  trace,
  unauthorized,
  unprocessableContent,
  unsupportedMediaType,
  url
};
