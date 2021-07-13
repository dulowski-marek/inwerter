import { Descriptor } from './Descriptor';
import { DescriptorStore } from './DescriptorStore';

export class Injector {
    constructor(
        private registry = new Map<any, Descriptor<any>>(),
        private container = new Map<any, any>(),
    ) { }

    public register<T>(descriptor: Descriptor<T>): Injector {
        this.registry.set(descriptor.getToken(), descriptor);

        return this;
    }

    public resolve<T>(token: any): T {
        if (this.container.has(token)) {
            return this.container.get(token);
        }

        const descriptor = this.registry.has(token)
            ? this.registry.get(token)
            : DescriptorStore.getDescriptorOrThrow(token);

        return descriptor.getFactory().create(
            ...descriptor.getDependencies().map(dependency => this.resolve(dependency)),
        );
    }
}
