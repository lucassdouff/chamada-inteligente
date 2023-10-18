import { createContext, useContext, useMemo, useState } from "react";
import { ModalOptionEnum } from "../enums/ModalOptionEnum";

interface ModalProviderProps {
    children: React.ReactNode;
};

type ModalContextProps = {
    modalShown: ModalOptionEnum;
    showModal: (modal : ModalOptionEnum) => void;
    hideModal: () => void;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export function ModalProvider({ children }: ModalProviderProps) {

    const [modalShown, setModalShown] = useState<ModalOptionEnum>('');

    function showModal (modal : ModalOptionEnum) {
        setModalShown(modal);
    }

    function hideModal () {
        setModalShown('');
    }

    const value = useMemo(() => {
        return {
            modalShown,
            showModal,
            hideModal
        }
    }, []);

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export const modalController = () => useContext(ModalContext);