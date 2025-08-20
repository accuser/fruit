export const html = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, headers: { 'Content-Type': 'text/html', ...init?.headers } });
