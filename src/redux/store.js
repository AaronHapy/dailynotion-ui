import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import {authConfig} from './config/authConfig'

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        [authConfig.reducerPath]: authConfig.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authConfig.middleware),
})

export default store;