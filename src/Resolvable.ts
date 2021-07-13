import { ClassDescriptor } from './ClassDescriptor';

type ResolvableOptions = {
    isSingleton?: boolean;
};

export const Resolvable = (options?: ResolvableOptions): ClassDecorator => (Target: any) => {
    ClassDescriptor.describe(Target, {
        isSingleton: options?.isSingleton ?? false,
    });

    return Target;
}
