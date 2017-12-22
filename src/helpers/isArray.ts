export function isArray<T>(target: any): target is T[] {
	return Array.isArray(target);
}
