import { combineReducers } from '@reduxjs/toolkit';
import { userSliceReducer } from './slice/userSlice/userSlice';

export const rootReducer = combineReducers({
    userSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
