import { Metadata } from '../metadata';
import { Newable } from '../newable';

import { isClass } from '../helpers/isClass';

import { merge } from '../helpers/merge';

export interface ProvideMetadata<TProvider> {
	factory: (...args: any[]) => TProvider;
	provide: any[];
	singleton?: boolean;
}


/**
 * Supplied options, if any, are merged into defaults.
 */
export function _uniformProvideMetadata<T>(token: Newable<T> | any, options?: Partial<ProvideMetadata<T>>): ProvideMetadata<T> {

	/**
	 * If factory is not provided, fallback to class.
	 * Provide is being obtained, fallback to metadata.
	 */

	/**
	 * Infer class defaults, if options aren't supplied
	 */
	if (!options) {

		/**
		 * Class defaults cannot be inferred, if token is not a class.
		 */
		if (!isClass<T>(token)) {
			throw new Error(`
				Could not instantiate ${token} provider:
				Options weren't supplied and token is not a class.
			`);
		}

		/**
		 * Get metadata if token is a class
		 */
		const metadata: any = Metadata.get(token);

		/**
		 * If there's no provide key in token's metadata
		 */
		if (!(metadata && metadata.provide)) {
			throw new Error(`
				Provider ${token} should be decorated as Injectable
				or options with provide should be supplied when registering the provider.
			`);
		}

		/**
		 * Return class defaults
		 */
		return {
			factory: (...args: any[]) => new token(...args),
			provide: metadata.provide,
		};
	}

	/**
	 * If options were supplied
	 */
	let { factory, provide } = options;

	if (!factory) {

		/**
		 * If there's no factory and token is not a class,
		 * we cannot infer how it is instantiated
		 */
		if (!isClass<T>(token)) {
			throw new Error(`
				Provider ${token} can't be instantiated.
				Factory function wasn't supplied and token is not a class.
			`);
		}

		/**
		 * If token is a class, return factory defaults
		 */
		factory = (...args: any[]) => new token(...args);
	}

	if (!provide) {
		/**
		 * Try to get metadata from token (provider)
		 */
		try {
			provide = Metadata.get(token).provide;
		} catch(err) {
			throw new Error(`
				Provider ${token} can't be instantiated.
				Provide array wasn't supplied and can't implicitly get metadata
				for token.
			`);
		}
	}

	/**
	 * Else merge inferred defaults with options
	 */
	return merge(options, {
		provide,
		factory
	});
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
	 * __Note__: Factory function (and optionally provide) should be supplied unless token is a class.
	 * Otherwise it will throw upon registraction, or, if token is a function, upon
	 * instantiation.
	 */
	public register<T>(token: Newable<T> | any, options?: Partial<ProvideMetadata<T>>): void {
		this.registry.set(token, _uniformProvideMetadata(token, options));
	}

	/**
	 * Return provider associated with token.
	 */
	public resolve<T>(token: Newable<T> | any): T {

		let provider: T;

		if (!this.registry.has(token)) {
			const { factory, provide } = _uniformProvideMetadata<T>(token);

			return this._resolve(factory, provide);
		}

		const { factory, provide, singleton } = this.registry.get(token);

		if (singleton) {

			/**
			 * If it has already been instantiated,
			 * get the provider associated with token.
			 */
			if (this.container.has(token)) {
				return this.container.get(token);
			}

			return this.container.set(
				token, 
				provider = this._resolve(factory, provide)
			), provider;
		}

		return this._resolve(factory, provide);
	}

	private _resolve<T>(factory: (...args: any[]) => T, provide: any[]): T {
		return factory(...provide.map(provider => this.resolve(provider)));
	}
}
