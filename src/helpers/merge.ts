import { isObject } from './isObject';
import { isArray } from './isArray';

function bothObjects<T, S>(target: T, source: S): boolean {
	return isObject(target) && isObject(source);
}

function bothArrays<T, S>(target: T, source: S): boolean {
	return isArray(target) && isArray(source);
}

function _merge<T, S>(target: T, source: S): T & S {

	/**
	 * Operate on copy, not to mutate original object.
	 */
	let acc: any = isArray(target) ? Array.from(target) : Object.assign({}, target);

	for (let key of Object.keys(source)) {
		let t = acc[key], s = source[key];

		/**
		 * Resursively merge if types are compatible, otherwise
		 * just assign.
		 */
		acc[key] = bothArrays(t, s) ? _merge(t, s) : bothObjects(t, s) ? _merge(t, s) : s;
	}

	return acc;
}

/**
 * Like Object.assign, but performs deep merge
 * if both parameters have compatible types.
 */
export function merge<T, S>(target: T, source: S): T & S {

	if (bothArrays(target, source) || bothObjects(target, source)) {
		return _merge(target, source);
	}

	throw new Error('Cannot merge incompatible types.');
}
