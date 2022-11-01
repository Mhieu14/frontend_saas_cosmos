import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux-toolkit/rootReducer';

const initialState: UserSliceState = {
    state: 'finished',
    data: '',
};

const thunkFuntion = {
    testGetData: createAsyncThunk<void, any, { state: RootState }>('test/testgetdata', async (useNotifier, thunkApi) => {
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
    reducers: {
        getAddress: (state) => {
            state.state = 'loading';
            state.data = 'address';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.testGetData.fulfilled, (state, action) => {});
    },
});

export const userSliceReducer = userSlice.reducer;

export const useUserSlice = () => {
    return { state: useSelector((state: RootState) => state.userSliceReducer), action: { ...userSlice.actions, ...thunkFuntion } };
};
