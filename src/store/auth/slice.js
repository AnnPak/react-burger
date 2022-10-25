import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { LOGIN_API, REGISTER_API, LOGOUT_API, TOKEN_API } from "../../utils/constants";

const initialState = {
    user: null, //anna anna@gmail.com

    accessToken: null,
    refreshToken: null,

    registerSending: false,
    registerError: false,

    loginSending: false,
    loginError: false,
};

export const registerUser = createAsyncThunk("auth/registerUser", async (requestBody) => {
    return await request(REGISTER_API, requestBody, "POST");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerSending = true;
                state.registerError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerSending = false;
                state.registerError = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                setCookie('token', state.refreshToken);
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerSending = false;
                state.registerError = true;
            });
    },
});

const { reducer } = authSlice;

export default reducer;
