import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { REGISTER_API } from "../../utils/constants";

const initialState = {
    registerSending: false,
    registerError: false,
    registerSuccess: false,
};

export const registerUser = createAsyncThunk("user/registerUser", async (requestBody) => {
    return await request(REGISTER_API, requestBody, "POST");
});

const redisterSlice = createSlice({
    name: "redister",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerSending = true;
                state.registerError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken, success} = action.payload

                state.registerSending = false;
                state.registerError = false;
                state.registerSuccess = success ? true : false;

                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken);
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerSending = false;
                state.registerError = true;
            })
    },
});

const { reducer } = redisterSlice;

export default reducer;
