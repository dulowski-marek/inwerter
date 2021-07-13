import { Injector } from './Injector';
import { GenericFactory } from '../Factory/GenericFactory';
import { Resolvable } from '../Resolvable';

describe('Injector', () => {
    describe('resolve', () => {
        test('resolve using previously registered Descriptor', () => {
            // given
            const injector = new Injector();
            const mockFactory = jest.fn(() => 'testValue');

            injector.register({
                getDependencies: () => [],
                getToken: () => 'testToken',
                getFactory: () => new GenericFactory(mockFactory),
                getOptions: () => ({
                    isSingleton: false,
                })
            });

            // when
            const result = injector.resolve('testToken');

            // then
            expect(result).toBe('testValue');
            expect(mockFactory).toHaveBeenCalled();
        });

        test('resolve if token descriptor is not registered', () => {
            // given
            const injector = new Injector();

            @Resolvable()
            class Target {}

            // when
            const result = injector.resolve(Target);

            // then
            expect(result).toBeInstanceOf(Target);
        });
    });
});
