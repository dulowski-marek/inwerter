export function isObject(target: any): target is object {
	return target !== null && typeof target === 'object';
}
