import { Metadata } from '../metadata';

import { getParamtypes } from '../helpers/paramtypes';
import { merge } from '../helpers/merge';

export function Provide<T>(target: T): T {
	const metadata = Metadata.get(target) || { provide: [] };

	Metadata.set(target, { provide: merge(getParamtypes(target), metadata.provide) });

	return target;
}
