export function Injectable<T>(): ClassDecorator {
	return function<T>(target: T): T {
		return target;
	}
}