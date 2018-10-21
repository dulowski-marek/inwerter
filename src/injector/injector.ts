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
