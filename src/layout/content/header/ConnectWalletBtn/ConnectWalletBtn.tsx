import { AccountBalanceWallet } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import useNotifier from 'src/hooks/useNotifier';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';
import { formatAddress } from 'src/utils/format';

export default function ConnectWalletBtn() {
    const { state, action } = useWalletSlice();
    const dispatch = useAppDispatch();
    const notify = useNotifier();
    const { address, status, chainConnectedInfo } = state;
    const { connectWallet } = action;

    if (status.connectWallet === FetchingStatus.FETCHING) {
        return (
            <Button variant="contained">
                Loading... <AccountBalanceWallet sx={{ ml: 1 }} />
            </Button>
        );
    }

    return (
        <Button variant="contained" onClick={() => dispatch(connectWallet({ notifier: notify }))} sx={{ placeItems: address ? 'start' : 'center' }}>
            {address ? (
                <span>
                    <span style={{ display: 'block', textAlign: 'left', fontSize: '16px', marginTop: '1px' }}>{formatAddress(address)}</span>
                    <span style={{ display: 'block', textAlign: 'left', marginTop: '8px', fontSize: '11px' }}>{chainConnectedInfo?.chainName}</span>
                </span>
            ) : (
                'Connect Wallet'
            )}{' '}
            <AccountBalanceWallet sx={{ ml: 1 }} />
        </Button>
    );
}
