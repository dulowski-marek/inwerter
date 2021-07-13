import { Descriptor } from '../../Descriptor';

export type DescriptorReducer<T> = (descriptor: Partial<Descriptor<T>>) => Partial<Descriptor<T>>;
