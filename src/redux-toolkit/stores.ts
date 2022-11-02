import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';
import { useDispatch } from 'react-redux';

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface BaseThunkApiProps {
    dispatch: AppDispatch;
    state: RootState;
}

export default store;
