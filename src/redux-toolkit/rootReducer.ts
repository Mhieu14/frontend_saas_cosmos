import { combineReducers } from '@reduxjs/toolkit';
import { userSliceReducer } from './slice/userSlice/userSlice';
import { walletSliceReducer } from './slice/walletSilce/walletSlice';
export const rootReducer = combineReducers({
    userSliceReducer,
    walletSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
