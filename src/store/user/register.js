import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { REGISTER_API } from "../../utils/constants";

const initialState = {
    registerSending: false,
    registerError: false,
    accessToken: null, 
    refreshToken: null,
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
                state.registerSending = false;
                state.registerError = false;

                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                setCookie("accessToken", state.accessToken);
            })
            .addCase(registerUser.rejected, (state) => {
                state.registerSending = false;
                state.registerError = true;
            })
    },
});

const { reducer } = redisterSlice;

export default reducer;
