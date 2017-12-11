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
}