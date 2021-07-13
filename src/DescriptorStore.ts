import { Descriptor } from './Descriptor';

const DESCRIPTOR_STORE_KEY = Symbol('DescriptorStoreKey');

export interface DescriptorStore {
    [DESCRIPTOR_STORE_KEY]: Descriptor<any>;
}

export abstract class DescriptorStore {
    public static getDescriptorOrThrow<T>(obj: unknown): Descriptor<T> {
        const descriptor = obj[DESCRIPTOR_STORE_KEY];

        if (descriptor === undefined) {
            throw new Error(`Object doesn't contain descriptor`);
        }

        return descriptor;
    }

    public static describe<T>(obj: unknown, descriptor: Descriptor<T>): void {
        obj[DESCRIPTOR_STORE_KEY] = descriptor;
    }
}