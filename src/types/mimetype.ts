type MIMETypeName =
	| 'application'
	| 'audio'
	| 'example'
	| 'font'
	| 'haptics'
	| 'image'
	| 'message'
	| 'model'
	| 'multipart'
	| 'text'
	| 'video';

export type MIMEType = `${MIMETypeName}/${string}` | `${MIMETypeName}/*` | '*/*';
