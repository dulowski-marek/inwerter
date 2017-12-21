import { Metadata } from '../metadata';

export function Provide<T>(target: T): T {

	const args = Metadata.get(target, 'design:paramtypes') || [];

	Metadata.set(target, { args });

	return target;
}
