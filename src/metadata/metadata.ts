export namespace Metadata {

	export const $key = Symbol.for('inwerter.metadata');

	export function get(target: Object) {
		return Reflect.getMetadata(Metadata.$key, target);
	}

	export function set(target: Object, value: any): void {
		Reflect.defineMetadata(Metadata.$key, value, target);
	}
}