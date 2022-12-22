import { Clear } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { imagePath } from 'src/constants/ImagePath';
import { ThemeCustomProvider } from 'src/contexts/theme-context';
import FormLogin from './FormLogin/FormLogin';
import React from 'react';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};

export default function Login() {
    return (
        <ThemeCustomProvider>
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
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <img src={imagePath.LOGO_ICON_4X} style={{ maxWidth: '100%', maxHeight: '99vh' }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FormLogin />
                    </Box>
                </Box>
            </SnackbarProvider>
        </ThemeCustomProvider>
    );
}
