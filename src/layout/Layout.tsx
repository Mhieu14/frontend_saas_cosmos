import { Box, IconButton, styled } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';
import { ThemeCustomProvider } from 'src/contexts/theme-context';
import { WalletProvider } from 'src/contexts/wallet-context/wallet-context';
import { Clear } from '@mui/icons-material';
import Header from './content/header/Header';
import { LayoutProvider, useLayoutContext } from 'src/contexts/layout-context/layout-context';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};

export default function Layout() {
    return (
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
                <ThemeCustomProvider>
                    <WalletProvider>
                        <Sidebar />
                        <Content />
                    </WalletProvider>
                </ThemeCustomProvider>
            </SnackbarProvider>
        </LayoutProvider>
    );
}
