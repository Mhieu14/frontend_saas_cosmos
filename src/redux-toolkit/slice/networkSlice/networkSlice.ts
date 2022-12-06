import { FetchingStatus } from 'src/constants/FetchingStatus';
import { IResponseGetListNetworks } from 'src/api/network/type';
import { INetworkSliceState } from './type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux-toolkit/rootReducer';
import { BaseThunkApiProps } from 'src/redux-toolkit/stores';
import { networkService } from 'src/api/network/networkService';

const initialState: INetworkSliceState = {
    data: [],
    status: FetchingStatus.IDLE,
};

const thunkFuntion = {
    getList: createAsyncThunk<IResponseGetListNetworks, void, BaseThunkApiProps>('network/get-list', async () => {
        try {
            const response = await networkService.getList();
            return response;
        } catch (err) {
            console.log(err);
            return [];
        }
    }),
};

const networkSlice = createSlice({
    name: 'network',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.getList.pending, (state) => {
            state.status = FetchingStatus.FETCHING;
        });
        builder.addCase(thunkFuntion.getList.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = FetchingStatus.SUCCESS;
        });
    },
});

export const networkSliceReducer = networkSlice.reducer;

export const useNetworkSlice = () => {
    return { state: useSelector((state: RootState) => state.network), action: { ...networkSlice.actions, ...thunkFuntion } };
};
