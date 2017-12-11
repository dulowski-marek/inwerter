import { Metadata } from '../metadata';
import { Provide } from '../provide';

export function Injectable<T>(): ClassDecorator {
	return function<T extends Function>(target: T): T {

		/**
		 * For now Injectables are primarily intended
		 * to be a subject to Injector resolution - explicit
		 * function-style decoration of Injectable target 
		 * ensures that.
		 */
		return Provide(target);
	}
}