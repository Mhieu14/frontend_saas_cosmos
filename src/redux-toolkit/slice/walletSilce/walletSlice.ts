import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { RootState } from 'src/redux-toolkit/rootReducer';
import { WalletSliceState } from './type';
import { thunkFuntion } from './thunkFunction';

const initialState: WalletSliceState = {
    status: {
        connectWallet: FetchingStatus.IDLE,
    },
    error: undefined,
    address: '',
    chainConnectedInfo: null,
    vchainClient: null,
    cosmStargateClient: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.connectWallet.pending, (state) => {
            state.status.connectWallet = FetchingStatus.FETCHING;
        });
        builder.addCase(thunkFuntion.connectWallet.fulfilled, (state, action) => {
            state.address = action.payload.address;
            state.vchainClient = action.payload.vchainClient;
            state.chainConnectedInfo = action.payload.chainConnectedInfo;
            state.cosmStargateClient = action.payload.cosmStargateClient;
            state.status.connectWallet = FetchingStatus.SUCCESS;
        });
    },
});

export const walletSliceReducer = walletSlice.reducer;

export const useWalletSlice = () => {
    return { state: useSelector((state: RootState) => state.wallet), action: { ...walletSlice.actions, ...thunkFuntion } };
};
