import { Metadata } from '../metadata';

export interface ProvideMetadata<TProvider> {
	factory: (...args: any[]) => TProvider;
	provide: ResolveRequest[];
	singleton?: boolean;
}

export interface ResolveRequest {
	token: any;
	provide: ResolveRequest[]; 
}

/**
 * Supplied options, if any, are merged into defaults.
 */
export function _uniformProvideMetadata<T>(token: Newable<T> | any, options?: Partial<ProvideMetadata<T>>): ProvideMetadata<T> {

	const defaults: ProvideMetadata<T> = {
		factory: (...args: any[]) => new token(...args),
		provide: null,
		singleton: false
	};

	if (isClass<T>(token)) {

		defaults.provide = Metadata.get(token).provide;

		return options ? merge(defaults, options) : defaults;
	}

	const { factory, provide } = options;
	
	/**
	 * Note: token is not a class here.
	 * 
	 * If token is not a class and options are not supplied,
	 * there isn't any appropriate default factory method.
	 */
	if (!factory) {
		throw new Error(`
			Could not infer how to instantiate provider ${token}.
			Please supply factory function in options parameter.
		`);
	}

	if (!provide) {
		throw new Error(`
			Could not infer provide array for ${token}.
			Please supply it in options parameter.
		`);
	}

	return merge(defaults, options);
}

export class Injector {

	/**
	 * A container for singletons.
	 */
	private container = new Map<any, any>();

	/**
	 * Registry mapping tokens to their resolve options.
	 */
	private registry = new Map<any, ProvideMetadata<any>>();

	constructor() {

	}

	/**
	 * Register provider resolution options for given token.
	 * 
	 * @param token Token for which provider resolution will be stored.
	 * 
	 * @param options Optional provider resolution options.
	 * 
	 * __Note__: Factory function (and optionally provide) be supplied unless token is a class.
	 * Otherwise it will throw upon registraction, or, if token is a function, upon
	 * instantiation.
	 */
	public register<T>(token: Newable<T> | any, options?: Partial<ProvideMetadata<T>>): void {
		this.registry.set(token, _uniformProvideMetadata(token, options));
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