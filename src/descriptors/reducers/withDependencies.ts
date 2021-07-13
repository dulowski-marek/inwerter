import { DescriptorReducer } from './DescriptorReducer';

export const withDependencies = <T>(dependencies: any[]): DescriptorReducer<T> => {
    return (descriptor) => ({
        ...descriptor,
        getDependencies: () => dependencies,
    });
}
