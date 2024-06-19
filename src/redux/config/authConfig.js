import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authConfig = createApi({
    reducerPath: 'authConfig',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/auth/'}),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: 'login',
                method: 'POST',
                body: userCredentials,
            }),
        }),

        registerUser: builder.mutation({
            query: (formData) => ({
                url: 'register',
                method: 'POST',
                body: formData
            })
        }),

        userDetails: builder.query({
            query: () => ({
                url: 'userDetails',
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }),
        }),
    })
});

export const {useLoginUserMutation, useUserDetailsQuery, useRegisterUserMutation} = authConfig;