import { Factory } from './Factory';

export class GenericFactory<T> implements Factory<T> {
    constructor(private fn: (...deps: any[]) => T) { }

    create(...deps: any[]) {
        return this.fn(...deps);
    }
}