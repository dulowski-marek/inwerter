import React from 'react';
import { render } from '@testing-library/react';
import { WithInjector } from './WithInjector';
import { useProvider } from './useProvider';

import { Injector, Resolvable, ofClass, ofConst } from 'inwerter';

describe('useProvider', () => {
    test('call injector.resolve() once, regardless of component rerender', async () => {
        // given
        const injector = new Injector();

        const resolveSpy = jest.spyOn(injector, 'resolve');

        @Resolvable()
        class Mock {}

        injector.register(ofClass(Mock));

        const MyComponent: React.FC<{ foo: string }> = ({ foo }) => {
            const mockProvider = useProvider(Mock);

            return <span data-testid='foo'>{foo}</span>;
        }

        const result = render(
            <WithInjector injector={injector}>
                <MyComponent foo={'bar'} />
            </WithInjector>
        );

        expect(resolveSpy).toHaveBeenCalledTimes(1);
        expect(await result.findByTestId('foo')).toHaveTextContent('bar');

        // when
        result.rerender(
            <WithInjector injector={injector}>
                <MyComponent foo={'baz'} />
            </WithInjector>
        );

        // then
        expect(resolveSpy).toHaveBeenCalledTimes(1);
        expect(await result.findByTestId('foo')).toHaveTextContent('baz');
    });

    test('should disallow changing initial token', async () => {
        // given
        const injector = new Injector();

        const resolveSpy = jest.spyOn(injector, 'resolve');
        const renderSpy = jest.fn();

        const MyComponent: React.FC<{ token: any }> = ({ token }) => {
            const provider = useProvider(token);

            renderSpy();

            return null;
        };

        injector.register(ofConst('foo', 'foo'));
        injector.register(ofConst('bar', 'bar'));

        // when
        const result = render(
            <WithInjector injector={injector}>
                <MyComponent token={'foo'} />
            </WithInjector>
        );

        result.rerender(
            <WithInjector injector={injector}>
                <MyComponent token={'bar'} />
            </WithInjector>
        );

        // then
        expect(renderSpy).toHaveBeenCalledTimes(3);
        expect(resolveSpy).toHaveBeenCalledTimes(2);
        expect(resolveSpy).toHaveBeenNthCalledWith(1, 'foo');
        expect(resolveSpy).toHaveBeenNthCalledWith(2, 'bar');
    });
});
