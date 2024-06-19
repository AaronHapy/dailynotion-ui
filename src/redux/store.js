import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import channelReducer from './slices/channelSlice';
import VideoReducer from './slices/videoSlice';
import {authConfig} from './config/authConfig';
import {channelConfig} from './config/channelConfig';
import {videoConfig} from './config/videoConfig'

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        channel: channelReducer,
        video: VideoReducer,
        [authConfig.reducerPath]: authConfig.reducer,
        [channelConfig.reducerPath]: channelConfig.reducer,
        [videoConfig.reducerPath]: videoConfig.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authConfig.middleware)
            .concat(channelConfig.middleware)
            .concat(videoConfig.middleware),
})

export default store;