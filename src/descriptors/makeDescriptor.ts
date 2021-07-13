import { DescriptorReducer } from './reducers/DescriptorReducer';
import { Descriptor } from '../Descriptor';

type DescriptorProvider<T> = (descriptor: Partial<Descriptor<T>>) => Descriptor<T>;

export const makeDescriptor = <T>(...reducers: DescriptorReducer<T>[]): DescriptorProvider<T> => {
    return (originalDescriptor => reducers.reduce((prev, next) => {
        return (descriptor) => next(prev(descriptor))
    })(originalDescriptor)) as DescriptorProvider<T>;
};
