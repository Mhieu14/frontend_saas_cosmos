import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';
import { ThemeCustomProvider } from 'src/contexts/theme-context';
import { WalletProvider } from 'src/contexts/wallet-context/wallet-context';
import { Clear } from '@mui/icons-material';
import Header from './header/Header';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};
export default function Layout() {
    return (
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
                    <Header />
                </WalletProvider>
            </ThemeCustomProvider>
        </SnackbarProvider>
    );
}
