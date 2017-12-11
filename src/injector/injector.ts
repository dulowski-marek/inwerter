import { Metadata } from '../metadata';

export class Injector {

	private registry: Map<any, any> = new Map();
	private registered: WeakSet<any> = new WeakSet();

	constructor() {

	}

	public register(provider: any): void {
		if (this.registered.has(provider)) {
			return;
		}

		this.registered.add(provider);
	}

	public resolve<T>(provider: any): T {

		/**
		 * Resolve instantly, if has already
		 * been instantiated. 
		 */
		if (this.registry.has(provider)) {
			return this.registry.get(provider);
		}

		/**
		 * Obtain parameter types from provider's 
		 * metadata annotation.
		 */
		const { args }: { args: any[] } = Metadata.get(provider);

		const resolved: T = new provider(args.map(v => this.resolve(v)));

		/**
		 * Block redundant instantiation by saving
		 * resolved provider to registry, but only
		 * if it has been registered beforehand.
		 */
		if (this.registered.has(provider)) {
			this.registry.set(provider, resolved);
		}

		return resolved;
	}
}