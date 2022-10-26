import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { LOGIN_API } from "../../utils/constants";

const initialState = {
    accessToken: null,
    refreshToken: null,

    loginSending: false,
    loginError: false,
};

export const loginUser = createAsyncThunk("user/loginUser", async (requestBody) => {
    return await request(LOGIN_API, requestBody, "POST");
});


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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

                setCookie("accessToken", state.accessToken);
                setCookie("refreshToken", state.refreshToken);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
            })
    },
});

const { reducer } = loginSlice;

export default reducer;
