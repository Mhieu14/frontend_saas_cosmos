import { createContext, ReactNode, useContext, useState } from 'react';
import { BaseContextProps } from 'src/global.config';

interface ModalContextInterface {
    open: boolean;
    title: string;
    content: ReactNode;
    closeModal: () => void;
    openModal: (title: string, content: ReactNode) => void;
}

const ModalContext = createContext({} as ModalContextInterface);

export function ModalProvider({ children }: BaseContextProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<ReactNode>(<></>);

    const closeModal = () => {
        setOpen(false);
    };
    const openModal = (title: string, content: ReactNode) => {
        setTitle(title);
        setContent(content);
        setOpen(true);
    };

    return <ModalContext.Provider value={{ open, title, content, closeModal, openModal }}>{children}</ModalContext.Provider>;
}

export const useModalContext = () => useContext(ModalContext);
