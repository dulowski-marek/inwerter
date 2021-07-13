/**
 * Allows specifying arbitrary token,
 * which should be used to lookup the provider
 * to be injected.
 */
import { DependenciesProxy } from '../DependenciesProxy/DependenciesProxy';

export function Inject(token: any) {
	return (target: any, key: string, index: number) => {
	    const proxy = new DependenciesProxy(target);

	    proxy.setDependency(index, token);
	};
}
