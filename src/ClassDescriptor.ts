import { DependenciesProxy } from './DependenciesProxy/DependenciesProxy';
import { GenericFactory } from './Factory/GenericFactory';
import { Factory } from './Factory/Factory';
import { Descriptor } from './Descriptor';
import { DescriptorStore } from './DescriptorStore';
import { DescriptorOptions } from './DescriptorOptions';

export class ClassDescriptor<T> implements Descriptor<T> {
    public static describe(Constructor: any, options: DescriptorOptions) {
        DescriptorStore.describe(Constructor, new ClassDescriptor(Constructor, options));
    }

    constructor(private Constructor: new (...args: any[]) => T, private options: DescriptorOptions) { }

    public getDependencies(): any[] {
        const proxy = new DependenciesProxy(this.Constructor);

        return proxy.getDependencies();
    }

    public getToken(): any {
        return this.Constructor;
    }

    public getFactory(): Factory<T> {
        return new GenericFactory((...args) => new this.Constructor(...args));
    }

    public getOptions(): DescriptorOptions {
        return this.options;
    }
}
