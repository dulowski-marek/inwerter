import React from 'react';
import { Injector } from 'inwerter';

import { InjectorContext } from './InjectorContext';

export const WithInjector: React.FC<{ injector: Injector }> = ({ injector, children }) => {
    return <InjectorContext.Provider value={injector}>
        {children}
    </InjectorContext.Provider>
}
