// Extract a single "param" piece.
type ExtractOne<S extends string> =
	// param=:name+
	S extends `${string}=:${infer Name}+`
		? { [K in Name]: [string, ...string[]] }
		: // param=(:name+)
			S extends `${string}=(:${infer Name}+)`
			? { [K in Name]: [string, ...string[]] }
			: // param=:name*
				S extends `${string}=:${infer Name}*`
				? { [K in Name]: string[] }
				: // param=(:name*)
					S extends `${string}=(:${infer Name}*)`
					? { [K in Name]: string[] }
					: // param=:name?
						S extends `${string}=:${infer Name}?`
						? { [K in Name]: string | undefined }
						: // param=(:name?)
							S extends `${string}=(:${infer Name}?)`
							? { [K in Name]: string | undefined }
							: // param=:name
								S extends `${string}=:${infer Name}`
								? { [K in Name]: string }
								: // param=(:name)
									S extends `${string}=(:${infer Name})`
									? { [K in Name]: string }
									: {};

export type ExtractSearchParams<T extends string> = T extends `?${infer Rest}` // drop leading "?"
	? ExtractSearchParams<Rest>
	: T extends `${infer Head}&${infer Tail}` // split on "&"
		? ExtractOne<Head> & ExtractSearchParams<Tail>
		: ExtractOne<T>;
