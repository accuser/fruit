export const text = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, headers: { 'Content-Type': 'text/plain', ...init?.headers } });
