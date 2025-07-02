type DeepReadonly<T> = T extends (infer R)[]
	? ReadonlyArray<DeepReadonly<R>>
	: // eslint-disable-next-line @typescript-eslint/ban-types
		T extends Function
		? T
		: T extends object
			? { readonly [P in keyof T]: DeepReadonly<T[P]> }
			: T;

export type { DeepReadonly };
