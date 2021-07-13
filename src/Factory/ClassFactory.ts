import { Factory } from './Factory';

export class ClassFactory<T> implements Factory<T> {
    constructor(
        private Target: new (...args: any[]) => T,
    ) { }

    create(...deps: any): T {
        return new this.Target(...deps);
    }
}
