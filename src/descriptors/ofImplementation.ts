import { Descriptor } from '../Descriptor';
import { DependenciesProxy } from '../DependenciesProxy/DependenciesProxy';
import { ClassFactory } from '../Factory/ClassFactory';
import { DescriptorOptions } from '../DescriptorOptions';
import { Factory } from '../Factory/Factory';

export const ofImplementation = <T>(interfaceClass: abstract new (...args: any[]) => T, implementationClass: new (...args: any[]) => T): Descriptor<T> => {
  return {
    getDependencies(): any[] {
      const proxy = new DependenciesProxy(implementationClass);

      return proxy.getDependencies();
    },
    getFactory(): Factory<T> {
      return new ClassFactory(implementationClass);
    },
    getOptions(): DescriptorOptions {
      return {
        isSingleton: false,
      };
    },
    getToken(): any {
      return interfaceClass;
    }
  }
}
