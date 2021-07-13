import { Factory } from '../../Factory/Factory';
import { DescriptorReducer } from './DescriptorReducer';

export const withFactory = <T>(factory: Factory<T>): DescriptorReducer<T> => {
    return (descriptor) => ({
        ...descriptor,
        getFactory: () => factory,
    });
}
