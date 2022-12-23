import { Breakpoint } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';
import { BaseContextProps } from 'src/global.config';

interface ModalContextInterface {
    open: boolean;
    title: string;
    content: ReactNode;
    closeModal: () => void;
    maxWidth: false | Breakpoint | undefined;
    openModal: (title: string, content: ReactNode) => void;
}

const ModalContext = createContext({} as ModalContextInterface);

export function ModalProvider({ children }: BaseContextProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<ReactNode>(<></>);
    const [maxWidth, setMaxWidth] = useState<false | Breakpoint | undefined>('xsm');

    const closeModal = () => {
        setOpen(false);
    };
    const openModal = (title: string, content: ReactNode, maxWidth?: false | Breakpoint | undefined) => {
        setTitle(title);
        setContent(content);
        setOpen(true);
        if (maxWidth) {
            setMaxWidth(maxWidth);
        }
    };

    return <ModalContext.Provider value={{ open, title, content, closeModal, openModal, maxWidth }}>{children}</ModalContext.Provider>;
}

export const useModalContext = () => useContext(ModalContext);
