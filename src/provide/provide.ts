export function Provide(): ClassDecorator {
	return function<T>(target: T): T {
		return target;
	}
}