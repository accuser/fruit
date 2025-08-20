import type { MIMEType, RequestPredicate } from '$types';

export const accept =
	(...mimetypes: MIMEType[]): RequestPredicate =>
	({ headers }) =>
		(headers.get('Accept') ?? '*/*')
			.split(',')
			.map((type) => type.trim().split(';')[0])
			.some(
				(acceptType) =>
					acceptType === '*/*' ||
					mimetypes.includes(acceptType as MIMEType) ||
					mimetypes.some((mimeType) => acceptType === `${mimeType.split('/')[0]}/*`)
			);
