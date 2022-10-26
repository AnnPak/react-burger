import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { LOGIN_API, REGISTER_API, GET_USER } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123

    accessToken: null,
    refreshToken: null,

    registerSending: false,
    registerError: false,

    loginSending: false,
    loginError: false,
};

export const registerUser = createAsyncThunk("user/registerUser", async (requestBody) => {
    return await request(REGISTER_API, requestBody, "POST");
});

export const loginUser = createAsyncThunk("user/loginUser", async (requestBody) => {
    return await request(LOGIN_API, requestBody, "POST");
});

export const getUser = createAsyncThunk("user/getUser", async (requestBody) => {
    return await request(GET_USER, requestBody);
});


const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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

                setCookie('accessToken', state.accessToken);
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerSending = false;
                state.registerError = true;
            })


            .addCase(loginUser.pending, (state) => {
                state.loginSending = true;
                state.loginError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginSending = false;
                state.loginError = false;

                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                setCookie('accessToken', state.accessToken);
                setCookie('refreshToken', state.refreshToken);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
            });
    },
});

const { reducer } = authSlice;

export default reducer;
