import { Newable } from '../newable';

/**
 * Checks if target is a class.
 */
export function isClass<T>(target: any): target is Newable<T> {

	/**
	 * Although this implementation is naive,
	 * it will suffice for resolution purposes.
	 */
	return typeof target === 'function';
}
