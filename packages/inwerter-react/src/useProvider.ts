import { useInjector } from './useInjector';
import { useState } from 'react';

export function useProvider<T>(token: new (...args: any[]) => T): T;
export function useProvider<T>(token: any): T {
    const injector = useInjector();
    const [previousToken, setPreviousToken] = useState(() => token);
    const [provider, setProvider] = useState<T>(() => injector.resolve<T>(token));

    if (previousToken !== token) {
        setPreviousToken(token);
        setProvider(injector.resolve(token));
    }

    return provider;
}
