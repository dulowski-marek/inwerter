import React from 'react';
import { render } from '@testing-library/react';
import { useInjector } from './useInjector';

describe('useInjector', () => {
    test(`throw an error if there's no InjectorContext`, () => {
        // given
        const MyComponent = () => {
            const injector = useInjector();

            return null;
        };

        expect(() => render(
            <MyComponent />
        )).toThrowError(`Missing InjectorContext. Please wrap your components into WithInjector`);
    });
});
