import { Metadata } from '../metadata';

export class Injector {

	private registry: Map<any, any> = new Map();
	private registered: WeakSet<any> = new WeakSet();

	constructor() {

	}
}