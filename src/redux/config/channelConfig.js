import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const channelConfig = createApi({
    reducerPath: 'channelConfig',
    baseQuery: fetchBaseQuery({baseUrl: '/api/channels/'}),
    endpoints: (builder) => ({
        getChannelDetails: builder.query({
            query: (channelId) => ({
                url: `channel/details/${channelId}`,
                method: 'GET'
            })
        }),

        userHasChannel: builder.query({
            query: (userId) => ({
                url: `channel/exists/${userId}`,
                method: 'GET'
            })
        }),

        createChannel: builder.mutation({
            query: ({formData, userId}) => ({
                url: `/create/${userId}`,
                method: 'POST',
                body: formData,
                headers: {
                     "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(errorMessage || 'Failed to create channel');
                    }
                    return await response.text();
                }
            })
        })
    })
});

export const {useGetChannelDetailsQuery, useUserHasChannelQuery, useCreateChannelMutation} = channelConfig;