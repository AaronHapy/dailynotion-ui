import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const videoConfig = createApi({
    reducerPath: 'videoConfig',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/videos'}),
    endpoints: (builder) => ({
        getRandomVideos: builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            })
        }),

        getVideoDetails: builder.query({
            query: (videoTitleUrl) => ({
                url: `/video/${videoTitleUrl}`,
                method: 'GET'
            })
        }),

        
        getVideosByChannel: builder.query({
            query: (channelId) => ({
                url: `/channel/${channelId}`,
                method: 'GET'
            })
        }),

        createVideo: builder.mutation({
            query: ({formData, channelId}) => ({
                url: `/create/video/${channelId}`,
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
        })
    })
});

export const {useGetRandomVideosQuery, useGetVideoDetailsQuery, useGetVideosByChannelQuery, useCreateVideoMutation} = videoConfig;