export class Injector {

	private registry = new Map<Token, any>();

	constructor() {

	}

	register(token: Token, provider: any): void {
		this.registry.set(token, provider);
	}

	provide<T = any>(token: Token): T {
		return this.registry.get(token);
	}
}