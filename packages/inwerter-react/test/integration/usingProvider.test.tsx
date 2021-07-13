import React from 'react';
import { render } from '@testing-library/react';
import { Injector, Resolvable, ofClass } from 'inwerter';

import { WithInjector } from '../../src/WithInjector'
import { useProvider } from '../../src/useProvider';

describe('useProvider', () => {
    test('get the registered provider', async () => {
        // given
        const MyComponent = () => {
            const mockClass = useProvider(MockClass);

            return <>{mockClass.getText()}</>
        }

        const injector = new Injector();

        @Resolvable()
        class MockClass {
            getText() {
                return "Hello world!"
            }
        }

        injector.register(ofClass(MockClass));

        // when
        const result = render(<WithInjector injector={injector}>
            <MyComponent />
        </WithInjector>);

        // then
        expect(await result.findByText(/Hello world!/)).toBeInTheDocument();
    });
});
