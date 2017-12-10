import { Metadata } from '../metadata';

export function Injectable<T>(): ClassDecorator {
	return function<T>(target: T): T {

		Metadata.set(target, {
			args: Metadata.get(target, 'design:paramtypes')
		});

		return target;
	}
}