import {createSlice} from '@reduxjs/toolkit'
import {authConfig} from '../config/authConfig'

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    isLoggedIn: !!localStorage.getItem('userInfo'),
    status: '',
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
                state.status = 'sucess';
                state.isLoggedIn = true;
            })

            .addMatcher(authConfig.endpoints.loginUser.matchPending, (state) => {
                state.status = 'loading';
            })

            .addMatcher(authConfig.endpoints.loginUser.matchRejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            .addMatcher(authConfig.endpoints.userDetails.matchFulfilled, (state, action) => {
                state.userInfo = action.payload;
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
    }
});

export const {logoutUser} = authSlice.actions;

export default authSlice.reducer;
