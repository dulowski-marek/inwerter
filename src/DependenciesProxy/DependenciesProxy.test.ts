import { DependenciesProxy } from './DependenciesProxy';
import { Resolvable } from '../Resolvable';

describe(`DependenciesProxy`, () => {
    test(`getDependencies() return inferred class dependencies`, () => {
        // given
        class A {}
        class B {}

        @Resolvable()
        class Target {
            constructor(
                a: A,
                b: B,
            ) { }
        }

        const proxy = new DependenciesProxy(Target);

        // when
        const result = proxy.getDependencies();

        // then
        expect(result).toEqual([A, B]);
    });

    test(`setDependency() override dependency at given index`, () => {
        // given
        class A {}
        class B {}

        @Resolvable()
        class Target {
            constructor(
                a: A,
            ) { }
        }

        const proxy = new DependenciesProxy(Target);

        proxy.setDependency(0, B);

        // when
        const result = proxy.getDependencies();

        // then
        expect(result).toEqual([B]);
    });
});
