import { Metadata } from '../metadata';

export function Provide<T>(target: T): T {

	Metadata.set(target, {
		args: Metadata.get(target, 'design:paramtypes')
	});

	return target;
}
