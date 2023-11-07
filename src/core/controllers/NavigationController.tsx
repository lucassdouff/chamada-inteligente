import { createContext, useContext, useMemo, useState } from "react";
import { UserSessionModel } from "../models/UserSessionModel";

interface NavigationProviderProps {
    children: React.ReactNode;
};

type NavigationContextProps = {
    userSession: UserSessionModel;
    setUserSession: React.Dispatch<React.SetStateAction<UserSessionModel>>;
};

const NavigationContext = createContext<NavigationContextProps>({} as NavigationContextProps);

export function NavigationProvider({ children }: NavigationProviderProps) {

    const [userSession, setUserSession] = useState<UserSessionModel>({} as UserSessionModel);

    const value = useMemo(() => {
        return {
            userSession: userSession,
            setUserSession: setUserSession
        }
    }, []);

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}

export const navigationController = () => useContext(NavigationContext);