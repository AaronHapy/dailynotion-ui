import {createSlice} from '@reduxjs/toolkit'
import {channelConfig} from '../config/channelConfig'

const initialState = {
    channel: {},
    error: null
};

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(channelConfig.endpoints.getChannelDetails.matchFulfilled, (state, action) => {
                state.channel = action.payload;
            })

            .addMatcher(channelConfig.endpoints.getChannelDetails.matchRejected, (state, action) => {
                state.error = action.payload.data.message;
            })
    }
});


export default channelSlice.reducer;
