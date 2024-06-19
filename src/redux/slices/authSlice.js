import {createSlice} from '@reduxjs/toolkit'
import {authConfig} from '../config/authConfig'

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    isLoggedIn: !!localStorage.getItem('userInfo'),
    loading: false,
    isSuccess: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userInfo = {};
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authConfig.endpoints.loginUser.matchFulfilled, (state, action) => {
                const {accessToken} = action.payload;
                localStorage.setItem("token", accessToken);
                state.loading = false;
                state.isLoggedIn = true;
                state.isSuccess = true;
            })

            .addMatcher(authConfig.endpoints.loginUser.matchPending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })

            .addMatcher(authConfig.endpoints.loginUser.matchRejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.error = action.error
            })

            .addMatcher(authConfig.endpoints.userDetails.matchFulfilled, (state, action) => {
                state.userInfo = action.payload;
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })

            .addMatcher(authConfig.endpoints.registerUser.matchFulfilled, (state) => {
                state.loading = false;
                state.isSuccess = true;
            })

            .addMatcher(authConfig.endpoints.registerUser.matchPending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })

            .addMatcher(authConfig.endpoints.registerUser.matchRejected, (state) => {
                state.loading = false;
                state.isSuccess = false;
            })
    }
});

export const {logoutUser} = authSlice.actions;

export default authSlice.reducer;
