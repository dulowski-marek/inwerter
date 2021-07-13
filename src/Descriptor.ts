import { Factory } from './Factory/Factory';
import { DescriptorOptions } from './DescriptorOptions';

export interface Descriptor<T> {
    getFactory(): Factory<T>;
    getToken(): any;
    getDependencies(): any[];
    getOptions(): DescriptorOptions;
}
