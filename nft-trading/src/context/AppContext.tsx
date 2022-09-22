// src/context/state.js
import { createContext, useContext } from 'react';

const AppContext = createContext({});

export function AppWrapper({ children, sdk }: { children: any, sdk: any }) {
    let sharedState = { sdk }
    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}