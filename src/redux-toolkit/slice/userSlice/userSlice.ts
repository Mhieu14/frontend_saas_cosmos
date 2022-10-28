import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux-toolkit/rootReducer';

const initialState: UserSliceState = {
    state: 'finished',
    data: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getAddress: (state) => {
            // const { address } = useWalletContext();
            state.state = 'loading';
            state.data = 'address';
        },
    },
});

export const userSliceReducer = userSlice.reducer;

export const useUserSlice = () => {
    return { state: useSelector((state: RootState) => state.userSliceReducer), action: userSlice.actions };
};
