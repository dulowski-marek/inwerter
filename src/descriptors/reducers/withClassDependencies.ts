import { DescriptorReducer } from './DescriptorReducer';
import { DependenciesProxy } from '../../DependenciesProxy/DependenciesProxy';

export const withClassDependencies = <T>(Constructor: new (...args: any[]) => T): DescriptorReducer<T> => {
    const proxy = new DependenciesProxy(Constructor);

    return (descriptor) => ({
        ...descriptor,
        getDependencies: () => proxy.getDependencies(),
    });
}
