import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { RootState } from 'src/redux-toolkit/rootReducer';
import { IChainConfig, WalletSliceState } from './type';
import { thunkFuntion } from './thunkFunction';

const chainConfigDefault: IChainConfig = {
    chainId: 'Oraichain',
    chainName: 'Oraichain mainnet',
    rpc: 'https://rpc.orai.io',
    rest: 'https://lcd.orai.io',
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
    decimal: 6,
    distributionDecimal: 27,
    mintDecimal: 18,
};

const initialState: WalletSliceState = {
    status: {
        connectWallet: FetchingStatus.IDLE,
    },
    error: undefined,
    address: '',
    chainConnectedInfo: chainConfigDefault,
    vchainClient: null,
    cosmStargateClient: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {
        setChainConnectedInfo: (state, action: { payload: IChainConfig }) => {
            state.chainConnectedInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.connectWallet.pending, (state) => {
            state.status.connectWallet = FetchingStatus.FETCHING;
        });
        builder.addCase(thunkFuntion.connectWallet.fulfilled, (state, action) => {
            state.address = action.payload.address;
            state.vchainClient = action.payload.vchainClient;
            state.cosmStargateClient = action.payload.cosmStargateClient;
            state.status.connectWallet = FetchingStatus.SUCCESS;
        });
    },
});

export const walletSliceReducer = walletSlice.reducer;

export const useWalletSlice = () => {
    const state = useSelector((state: RootState) => state.wallet);
    return { state: state, action: { ...walletSlice.actions, ...thunkFuntion } };
};
