import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";

import { requestForUser, requestToken } from "../../utils/request";
import { GET_USER, TOKEN_API } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123
    userSending: false,
    userError: false,

    refreshTokenSending: false,
    refreshTokenError: false,
    
};

// const token = getCookie("accessToken");
const refreshTokenValue = getCookie("refreshToken");

export const userRequest = createAsyncThunk("user/userRequest", async ({headers, method, body}) => {
    return await requestForUser({url: GET_USER, headers, method, body})
    .then(data => {
        return data
      });
});


export const refreshToken = createAsyncThunk("user/refreshToken", async ({ method, body}) => {
    return await requestForUser({url: TOKEN_API, body, method})
    .then(data => {
        return data
      });
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userRequest.pending, (state) => {
                state.userSending = true;
                state.loginError = false;
            })
            .addCase(userRequest.fulfilled, (state, action) => {
                const {success, user} = action.payload
                state.userSending = false;
                state.userError = success ? false : true;
                state.user = success && user;
            })
            .addCase(userRequest.rejected, (state) => {
                state.userSending = false;
                state.userError = true;
            })
            
            .addCase(refreshToken.pending, (state) => {
                state.refreshTokenSending = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                const {success, accessToken} = action.payload

                state.refreshTokenSending = false;
                state.jwtExpired = false;
                success && setCookie("accessToken", accessToken);
            })
            .addCase(refreshToken.rejected, (state) => {
                state.refreshTokenError = true;
                state.refreshTokenSending = false;
            })

    },
});

const { reducer } = userSlice;

export default reducer;
