export type ExtractPatternParams<T extends string> =
	// Handle named groups with optional + modifier: (:param+)
	T extends `${string}(:${infer Param}+)${infer Rest}`
		? { [K in Param]: string } & ExtractPatternParams<Rest>
		: // Handle named groups with optional * modifier: (:param*)
			T extends `${string}(:${infer Param}*)${infer Rest}`
			? { [K in Param]: string } & ExtractPatternParams<Rest>
			: // Handle named groups with optional ? modifier: (:param?)
				T extends `${string}(:${infer Param}?)${infer Rest}`
				? { [K in Param]: string | undefined } & ExtractPatternParams<Rest>
				: // Handle regular named groups: (:param)
					T extends `${string}(:${infer Param})${infer Rest}`
					? { [K in Param]: string } & ExtractPatternParams<Rest>
					: // Handle simple colon syntax: :param followed by /
						T extends `${string}:${infer ParamAndRest}`
						? ParamAndRest extends `${infer Param}/${infer Rest}`
							? { [K in Param]: string } & ExtractPatternParams<`/${Rest}`>
							: { [K in ParamAndRest]: string }
						: {};
