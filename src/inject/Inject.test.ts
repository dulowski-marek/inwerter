import { DependenciesProxy } from '../DependenciesProxy/DependenciesProxy';
import { Inject } from './inject';

jest.mock(`../DependenciesProxy/DependenciesProxy`);

describe(`@Inject() decorator`, () => {
    test(`use DependenciesProxy to override positional dependency`, () => {
        // when
        class Target {
            constructor(
                @Inject('mockToken') a: string,
            ) { }
        }

        // then
        expect(DependenciesProxy).toHaveBeenCalledWith(Target);
    });
});
