import { Metadata } from "../metadata/index";

export class Injector {

	private registry = new Set<Token>();
	private resolved = new Map<Token, any>();

	constructor() {

	}

	register(token: Token): void {
		this.registry.add(token);
	}

	provide<T = any>(token: Token): T {
		return this.resolved.get(token);
	}

	resolve<T extends { new(...args: any[]): T }>(target: T): T {
		let paramtypes = Metadata.get(target, 'design:paramtypes');

		return new target(paramtypes.map(provider => {
			// If provider has already been resolved
			if (this.resolved.has(provider)) {
				return this.resolved.get(provider);
			}

			let resolved = this.resolve(provider);

			this.resolved.set(provider, resolved);
			this.registry.delete(provider);

			return resolved;
		}));
	}
}