import { AccountBalanceWallet, AccountBalanceWalletOutlined, CopyAll, VpnKeyOff } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { slideDownFadeInBoth } from 'src/assets/animations/slide_down_fade_in';
import { BoxWrapper } from 'src/common/BoxWrapper';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { layoutConfig } from 'src/contexts/layout-context/layout-context';
import useNotifier from 'src/hooks/useNotifier';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';
import { formatAddress } from 'src/utils/format';

export default function ConnectWalletBtn() {
    const { state, action } = useWalletSlice();
    const dispatch = useAppDispatch();
    const notify = useNotifier();
    const { address, status } = state;
    const { connectWallet } = action;

    if (status.connectWallet === FetchingStatus.FETCHING) {
        return (
            <Button variant="contained">
                Connecting... <AccountBalanceWalletOutlined sx={{ ml: 1 }} />
            </Button>
        );
    }

    if (!address) {
        return (
            <Button variant="contained" onClick={() => dispatch(connectWallet({ notifier: notify }))} sx={{ placeItems: address ? 'start' : 'center' }}>
                Connect Wallet
                <AccountBalanceWalletOutlined sx={{ ml: 1 }} />
            </Button>
        );
    }

    return <ButtonAlreadyConnectedWallet />;
}

function ButtonAlreadyConnectedWallet() {
    const { state } = useWalletSlice();
    const { address, chainConnectedInfo } = state;
    const { notifyError, notifySuccess } = useNotifier();
    const [menuOpen, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const copyAddress = () => {
        try {
            navigator.clipboard.writeText(address);
            notifySuccess('Copied address!', { autoHideDuration: 1000 });
        } catch (err) {
            console.log(err);
            notifyError((err as Error).message);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
                <Button variant="contained" onClick={handleClick} sx={{ placeItems: address ? 'start' : 'center' }}>
                    <span>
                        <span style={{ display: 'block', textAlign: 'left', fontSize: '16px', marginTop: '1px' }}>{formatAddress(address)}</span>
                        <span style={{ display: 'block', textAlign: 'left', marginTop: '8px', fontSize: '11px' }}>{chainConnectedInfo?.chainName}</span>
                    </span>
                    <AccountBalanceWalletOutlined sx={{ ml: 1 }} />
                </Button>
                <BoxWrapper
                    sx={{
                        overflow: 'hidden',
                        animation: slideDownFadeInBoth,
                        p: 1,
                        position: 'absolute',
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        top: '110%',
                        transformOrigin: 'top',
                        right: 0,
                        zIndex: 10,
                        boxShadow: 3,
                        minWidth: '100%',
                        width: 'max-content',
                        display: menuOpen ? 'block' : 'none',
                        cursor: 'pointer',
                    }}
                >
                    <Box
                        component={'div'}
                        sx={{
                            p: 1.5,
                            display: 'flex',
                            borderRadius: layoutConfig.borderRadius,
                            '&:hover': {
                                bgcolor: 'primary.light',
                            },
                        }}
                        onClick={copyAddress}
                    >
                        <CopyAll sx={{ mr: 1 }} />
                        <Typography>Copy address</Typography>
                    </Box>
                    <Box
                        component={'div'}
                        sx={{
                            p: 1.5,
                            display: 'flex',
                            borderRadius: layoutConfig.borderRadius,
                            '&:hover': {
                                bgcolor: 'primary.light',
                            },
                        }}
                    >
                        <VpnKeyOff sx={{ mr: 1 }} />
                        <Typography>Disconnect</Typography>
                    </Box>
                </BoxWrapper>
            </Box>
        </ClickAwayListener>
    );
}
