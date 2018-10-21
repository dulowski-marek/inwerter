import { Metadata } from '../metadata';

import { merge } from '../helpers/merge';

/**
 * Allows for specifying arbitrary token,
 * which should be used to lookup the provider
 * to be injected.
 */
export function Inject(token: any) {
	return (target: any, key: string, index: number) => {
		let metadata = Metadata.get(target) || { provide: [] };

		metadata.provide[index] = token;

		Metadata.set(target, metadata);
	};
}
