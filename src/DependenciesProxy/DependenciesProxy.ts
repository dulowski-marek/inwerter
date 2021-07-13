export class DependenciesProxy {
    private static readonly STORAGE_KEY = Symbol('DependenciesProxy storage key');

    constructor(private Constructor: new (...args: any[]) => any) { }

    public getDependencies(): any[] {
        const inferredDeps = this.getInferredDependencies();
        const injectDeps = this.getInjectDependencies();

        return inferredDeps.map((dep, i) => {
            return injectDeps[i] ?? dep;
        });
    }

    public setDependency(index: number, token: any): this {
        const dependencies: Map<number, any> = this.Constructor[DependenciesProxy.STORAGE_KEY] ?? [];

        dependencies[index] = token;

        this.Constructor[DependenciesProxy.STORAGE_KEY] = dependencies;

        return this;
    }

    private getInferredDependencies(): any[] {
        // @ts-ignore
        const deps: any[] = Reflect.getOwnMetadata('design:paramtypes', this.Constructor) ?? [];

        if (!deps) {
            throw new Error(`Cannot infer dependencies. Decorate the class with @Injectable()`);
        }

        return deps;
    }

    private getInjectDependencies(): any[] {
        return this.Constructor[DependenciesProxy.STORAGE_KEY] ?? [];
    }
}
