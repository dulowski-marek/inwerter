import { useContext } from 'react';
import { InjectorContext } from './InjectorContext';

export const useInjector = () => {
    const injector = useContext(InjectorContext);

    if (injector === null) {
        throw new Error(`Missing InjectorContext. Please wrap your components into WithInjector`);
    }

    return injector;
}
