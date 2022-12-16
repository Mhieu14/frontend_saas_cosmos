import { combineReducers } from '@reduxjs/toolkit';
import { networkSliceReducer } from './slice/networkSlice/networkSlice';
import { userSliceReducer } from './slice/userSlice/userSlice';
import { walletSliceReducer } from './slice/walletSilce/walletSlice';

export const rootReducer = combineReducers({
    user: userSliceReducer,
    wallet: walletSliceReducer,
    network: networkSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
