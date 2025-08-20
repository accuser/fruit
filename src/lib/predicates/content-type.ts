import type { MIMEType, RequestPredicate } from '$types';

export const contentType =
	(...mimetypes: MIMEType[]): RequestPredicate =>
	({ headers }) =>
		(headers.get('Content-Type') ?? '*/*')
			.split(',')
			.map((type) => type.trim().split(';')[0])
			.some((contentType) => contentType === '*/*' || mimetypes.includes(contentType as MIMEType));
