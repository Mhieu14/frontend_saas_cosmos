import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux-toolkit/rootReducer';
import { BaseThunkApiProps } from 'src/redux-toolkit/stores';

const initialState: UserSliceState = {
    state: 'finished',
    data: '',
};

const thunkFuntion = {
    signLogin: createAsyncThunk<void, any, BaseThunkApiProps>('user/sign-login', async (useNotifier, thunkApi) => {}),
    testGetData: createAsyncThunk<void, any, BaseThunkApiProps>('user/testgetdata', async (useNotifier, thunkApi) => {
        try {
            const { notifySuccess } = useNotifier;
            notifySuccess('alooooo');
        } catch (err) {
            console.log(err);
        }
    }),
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.testGetData.fulfilled, (state, action) => {});
    },
});

export const userSliceReducer = userSlice.reducer;

export const useUserSlice = () => {
    return { state: useSelector((state: RootState) => state.user), action: { ...userSlice.actions, ...thunkFuntion } };
};
