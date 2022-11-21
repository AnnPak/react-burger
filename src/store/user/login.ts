import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { LOGIN_API } from "../../utils/constants";

type TLoginState = {
    loginSending: boolean;
    loginSuccess: null | boolean;
    loginError: boolean;
};

const initialState: TLoginState = {
    loginSending: false,
    loginSuccess: null,
    loginError: false,
};

export const loginUser = createAsyncThunk("user/loginUser", async (requestBody: string) => {
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
                const { accessToken, refreshToken, success } = action.payload;

                state.loginSending = false;
                state.loginError = false;
                state.loginSuccess = success ? true : false;

                success && setCookie("accessToken", accessToken, null);
                success && localStorage.setItem("refreshToken", refreshToken);
                success && localStorage.setItem("isUserLogged", "true");
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
                state.loginSuccess = false;
                localStorage.setItem("isUserLogged", "false");
            });
    },
});

const { reducer } = loginSlice;

export default reducer;
