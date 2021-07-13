import { Injector, Inject } from '../../src';
import { ofConst } from '../../src/descriptors';
import { ofClass } from '../../src/descriptors';
import { Resolvable } from '../../src';

describe("Register and resolve", () => {
    describe("given that a constant is registered with ofConst()", () => {
        test("it can be resolved using its token", () => {
            // given
            const injector = new Injector();
            const mockConstant = Symbol();

            injector.register(ofConst('mockConstant', mockConstant));

            // when
            const result = injector.resolve('mockConstant');

            // then
            expect(result).toBe(mockConstant);
        });
    });

    describe("given that a class is registered with ofClass()", () => {
        test("it can be resolved using class itself as token", () => {
            // given
            const injector = new Injector();

            @Resolvable()
            class MockClass { }

            injector.register(ofClass(MockClass));

            // when
            const result = injector.resolve(MockClass);

            // then
            expect(result).toBeInstanceOf(MockClass);
        });

        test("it will receive its dependencies", () => {
            // given
            const mockFn = jest.fn();

            const injector = new Injector();

            @Resolvable()
            class Dependency {
                call() {
                    mockFn();
                }
            }

            @Resolvable()
            class MockClass {
                constructor(private dep: Dependency) { }

                call() {
                    this.dep.call();
                }
            }

            injector.register(ofClass(Dependency));
            injector.register(ofClass(MockClass));

            const result = injector.resolve<MockClass>(MockClass);

            // when
            result.call();

            // then
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        test("inject dependencies will override inferred ones", () => {
            // given
            const injector = new Injector();

            class Foo { }
            class Bar { }
            class Baz { }
            class Quux { }

            injector.register(ofClass(Foo));
            injector.register(ofClass(Bar));
            injector.register(ofClass(Baz));
            injector.register(ofClass(Quux));

            @Resolvable()
            class MockClass {
                constructor(
                    public foo: Foo,
                    @Inject(Quux) public bar: Bar,
                    public baz: Baz
                ) { }
            }

            injector.register(ofClass(MockClass));

            // when
            const result = injector.resolve<MockClass>(MockClass);

            // then
            expect(result.bar).toBeInstanceOf(Quux);
        });
    });
});
