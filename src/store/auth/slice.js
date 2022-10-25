import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import request from "../../utils/request";
import { LOGIN_API, REGISTER_API, LOGOUT_API, TOKEN_API } from "../../utils/constants";

const initialState = {
    data: null,
    accessToken: null,
    refreshToken: null,
    registerSending: false,
    registerError: false,
    loginSending: false,
    loginSucces: false,
    loginError: false,
};

export const registerUser = createAsyncThunk("auth/registerUser", async (requestBody) => {
    return await request(REGISTER_API, requestBody, "POST");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.data = action.payload;
        },
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
                state.data = action.payload;
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerSending = false;
                state.registerError = true;
            });
    },
});

const { reducer } = authSlice;

export default reducer;
