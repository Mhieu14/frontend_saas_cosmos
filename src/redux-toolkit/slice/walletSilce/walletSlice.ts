import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { RootState } from 'src/redux-toolkit/rootReducer';
import { IChainConfig, WalletSliceState } from './type';
import { thunkFuntion } from './thunkFunction';
import useNotifier from 'src/hooks/useNotifier';
import { baseDivident, BN } from 'src/utils';
import { coin } from '@cosmjs/stargate';
import { BigNumberish } from 'src/global.config';
import BigNumber from 'bignumber.js';

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
    const { notifyError, notifySuccess } = useNotifier();
    const state = useSelector((state: RootState) => state.wallet);
    const { cosmStargateClient, chainConnectedInfo, address } = state;

    const nonDispatchFunction = {
        delegateToken: async (amount: string | number, validatorAddress: string) => {
            if (!cosmStargateClient) {
                notifyError('You have not connected your wallet yet!');
            } else {
                try {
                    const denomStake = chainConnectedInfo?.stakeCurrency?.coinMinimalDenom || '';
                    const denomFee = chainConnectedInfo?.feeCurrencies[0]?.coinMinimalDenom || '';
                    const baseDecimalDivident = baseDivident(chainConnectedInfo.decimal || 6);

                    const amountDelegate = coin(BN(amount).times(baseDecimalDivident).toFixed(), denomStake);
                    const fee = { gas: '180000', amount: [{ amount: '0', denom: denomFee }] };

                    const tx = await cosmStargateClient.delegateTokens(address, validatorAddress, amountDelegate, fee);
                    console.log(tx);

                    // TODO: update delegated value on UI
                    // await getDelegatedValue(cosmStargateClient, address, validatorAddress, chainConnectedInfo?.stakeCurrency?.coinDecimals || '');
                    notifySuccess('Transaction successful!');
                } catch (err) {
                    console.log(err);
                    notifyError((err as Error).message || 'Transaction error!');
                }
            }
        },
        getDelegatedValue: async (validatorAddress: string): Promise<BigNumber> => {
            if (cosmStargateClient) {
                try {
                    const response = await cosmStargateClient.getDelegation(address, validatorAddress);
                    const baseDecimalDivident = baseDivident(chainConnectedInfo.decimal || 6);
                    // console.log(response);
                    return BN(response?.amount || 0).div(baseDecimalDivident);
                } catch (err) {
                    console.log(err);
                    return BN(0);
                }
            }
            return BN(0);
        },
        getTokenBalance: async (): Promise<BigNumber> => {
            if (cosmStargateClient) {
                try {
                    const denom = chainConnectedInfo.stakeCurrency.coinMinimalDenom;
                    const { amount } = await cosmStargateClient.getBalance(address, denom);
                    const baseDecimalDivident = baseDivident(chainConnectedInfo.decimal || 6);
                    return BN(amount).div(baseDecimalDivident);
                } catch (err) {
                    console.log(err);
                    return BN(0);
                }
            }
            return BN(0);
        },
    };

    return { state: state, action: { ...walletSlice.actions, ...thunkFuntion }, nonDispatchFunction: nonDispatchFunction };
};
