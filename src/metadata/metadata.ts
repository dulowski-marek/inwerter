export namespace Metadata {

	/**
	 * This is a temporary string-based key which should be changed to symbol.
	 *
	 * @see https://github.com/dulowski-marek/inwerter/issues/10
	 */
	export const $key = '__INWERTER_METADATA_KEY__';

	export function get<T = any>(target: Object, key: string = Metadata.$key): T {
		return Reflect.getMetadata(key, target);
	}

	export function set(target: Object, value: any): void {
		Reflect.defineMetadata(Metadata.$key, value, target);
	}
}