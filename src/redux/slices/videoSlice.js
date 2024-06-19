import {createSlice} from '@reduxjs/toolkit'
import {videoConfig} from '../config/videoConfig'

const initialState = {
    videos: [],
    video: {},
    loading: false,
    isSuccess: false,
    error: null
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(videoConfig.endpoints.getRandomVideos.matchFulfilled, (state, action) => {
                state.videos = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })

            .addMatcher(videoConfig.endpoints.getRandomVideos.matchPending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })

            .addMatcher(videoConfig.endpoints.getRandomVideos.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addMatcher(videoConfig.endpoints.getVideoDetails.matchFulfilled, (state, action) => {
                state.video = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            
            .addMatcher(videoConfig.endpoints.getVideoDetails.matchPending, (state) => {
                state.isSuccess = false;
                state.loading = true;
            })

            .addMatcher(videoConfig.endpoints.getVideoDetails.matchRejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            })

            .addMatcher(videoConfig.endpoints.createVideo.matchFulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.video = action.payload;
            })

            .addMatcher(videoConfig.endpoints.createVideo.matchPending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })

            .addMatcher(videoConfig.endpoints.createVideo.matchRejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            })
    }
});


export default videoSlice.reducer;
