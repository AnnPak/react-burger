import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { LOGIN_API } from "../../utils/constants";

const initialState = {
    loginSending: false,
    loginSuccess: null,
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
                const { user, accessToken, refreshToken, success } = action.payload;

                state.loginSending = false;
                state.loginError = false;
                state.loginSuccess = success ? true : false;

                state.user = user;
                success && setCookie("accessToken", accessToken);
                success && setCookie("refreshToken", refreshToken);
                success && setCookie("isUserLogged", true);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
                state.loginSuccess = false;
                setCookie("isUserLogged", false);
            });
    },
});

const { reducer } = loginSlice;

export default reducer;
