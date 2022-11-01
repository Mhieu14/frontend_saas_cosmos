## Redux slice template

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux-toolkit/rootReducer';

const initialState: { state: string; data?: string } = {
    state: 'finished',
    data: '',
};

const thunkFuntion = {
    testGetData: createAsyncThunk<void, void, { state: RootState }>('test/testgetdata', async (_, thunkApi) => {
        const { getState } = thunkApi;
        const data = getState();
        console.log(data.userSliceReducer);
    }),
};

const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        getUserState: (state) => {
            state.state = 'loading';
            // state.data = data || 'unknow';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkFuntion.testGetData.fulfilled, (state, action) => {});
    },
});

export const testSliceReducer = testSlice.reducer;

export const useTestSlice = () => {
    return { state: useSelector((state: RootState) => state.testSliceReducer), action: { ...testSlice.actions, ...thunkFuntion } };
};
```
