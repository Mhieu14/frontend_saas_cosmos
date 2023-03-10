import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';
import { ThemeCustomProvider } from 'src/contexts/theme-context';
import { Clear } from '@mui/icons-material';
import { LayoutProvider } from 'src/contexts/layout-context/layout-context';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import { Provider } from 'react-redux';
import store from 'src/redux-toolkit/stores';
import { ModalProvider } from 'src/contexts/modal-context';
import ModalCustom from 'src/common/ModalCustom';
import AutoFetchData from './AutoFetchData/AutoFetchData';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};

export default function Layout() {
    return (
        <ThemeCustomProvider>
            <LayoutProvider>
                <SnackbarProvider
                    maxSnack={3}
                    ref={notistackRef}
                    preventDuplicate
                    action={(key) => (
                        <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
                            <Clear style={{ cursor: 'pointer' }} />
                        </IconButton>
                    )}
                >
                    <ModalProvider>
                        <Provider store={store}>
                            <>
                                <AutoFetchData />
                                <Sidebar />
                                <Content />
                                <ModalCustom />
                            </>
                        </Provider>
                    </ModalProvider>
                </SnackbarProvider>
            </LayoutProvider>
        </ThemeCustomProvider>
    );
}
