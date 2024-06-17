import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import channelReducer from './slices/channelSlice';
import {authConfig} from './config/authConfig';
import {channelConfig} from './config/channelConfig';

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        channel: channelReducer,
        [authConfig.reducerPath]: authConfig.reducer,
        [channelConfig.reducerPath]: channelConfig.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authConfig.middleware)
            .concat(channelConfig.middleware),
})

export default store;