import { ChainInfo } from '@keplr-wallet/types';
import { AccountBalanceWallet } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import useNotifier from 'src/hooks/useNotifier';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';
import { formatAddress } from 'src/utils/format';

const chainConfig: ChainInfo = {
    chainId: 'Oraichain-testnet',
    chainName: 'Orai Test',
    rpc: 'https://testnet-rpc.orai.io',
    rest: 'https://testnet-lcd.orai.io',
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: 'orai',
        bech32PrefixAccPub: 'orai' + 'pub',
        bech32PrefixValAddr: 'orai' + 'valoper',
        bech32PrefixValPub: 'orai' + 'valoperpub',
        bech32PrefixConsAddr: 'orai' + 'valcons',
        bech32PrefixConsPub: 'orai' + 'valconspub',
    },
    currencies: [
        {
            coinDenom: 'ORAI',
            coinMinimalDenom: 'orai',
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
        },
    ],
    feeCurrencies: [
        {
            coinDenom: 'ORAI',
            coinMinimalDenom: 'orai',
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
        },
    ],
    stakeCurrency: {
        coinDenom: 'ORAI',
        coinMinimalDenom: 'orai',
        coinDecimals: 6,
        coinGeckoId: 'oraichain-token',
    },
    coinType: 118,
};

export default function ConnectWalletBtn() {
    const { state, action } = useWalletSlice();
    const dispatch = useAppDispatch();
    const notify = useNotifier();
    const { address, status } = state;
    const { connectWallet } = action;

    if (status.connectWallet === FetchingStatus.FETCHING) {
        return (
            <Button variant="contained">
                Loading... <AccountBalanceWallet sx={{ ml: 1 }} />
            </Button>
        );
    }

    return (
        <Button variant="contained" onClick={() => dispatch(connectWallet({ notifier: notify, chainConfig: chainConfig }))}>
            {address ? formatAddress(address) : 'Connect Wallet'} <AccountBalanceWallet sx={{ ml: 1 }} />
        </Button>
    );
}
