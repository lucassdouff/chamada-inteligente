import { createContext, useContext, useMemo, useState } from "react";
import { UserSessionModel } from "../models/UserSessionModel";

interface NavigationProviderProps {
    children: React.ReactNode;
};

type NavigationContextProps = {
    userSession: UserSessionModel | undefined;
    setSession: (userSession: UserSessionModel | undefined) => void;
};

const NavigationContext = createContext<NavigationContextProps>({} as NavigationContextProps);

export function NavigationProvider({ children }: NavigationProviderProps) {

    const [userSession, setUserSession] = useState<UserSessionModel | undefined>();

    const setSession = (session: UserSessionModel | undefined) => {
        setUserSession(session);
    }

    return (
        <NavigationContext.Provider value={{ userSession, setSession }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const navigationController = () => useContext(NavigationContext);