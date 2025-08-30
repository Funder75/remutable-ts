/**
 * A utility type that removes readonly modifiers from all properties of T,
 * keeping the type structure intact with no runtime impact.
 */
export type Mutable<T> = {
	-readonly [K in keyof T]: T[K];
};

/**
 * Returns the given object typed as Mutable<T>, effectively removing readonly
 * modifiers from its properties. This function preserves the original type shape and only has i minimal runtime impact.
 */
export function mutable<T>(obj: T): Mutable<T> {
	return obj as Mutable<T>;
}
