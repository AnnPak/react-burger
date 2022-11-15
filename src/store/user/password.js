import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { FORGOT_PSWRD, RESET_PSWRD } from "../../utils/constants";

const initialState = {
    forgotSending: false,
    forgotSuccess: false,
    forgotError: false,

    resetSending: false,
    resetSuccess: false,
    resetError: false,
};

export const forgotPassword = createAsyncThunk("user/forgotPassword", async (requestBody) => {
    return await request(FORGOT_PSWRD, requestBody, "POST");
});

export const resetPassword = createAsyncThunk("user/resetPassword", async (requestBody) => {
    return await request(RESET_PSWRD, requestBody, "POST");
});

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.forgotSending = true;
                state.forgotError = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                const { success} = action.payload

                state.forgotSending = false;
                state.forgotError = false;
                state.forgotSuccess = success ? true : false;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.forgotSending = false;
                state.forgotError = true;
            })

            .addCase(resetPassword.pending, (state) => {
                state.resetSending = true;
                state.resetError = false;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                const { success} = action.payload

                state.resetSending = false;
                state.resetError = false;
                state.resetSuccess = success ? true : false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.resetSending = false;
                state.resetError = true;
            })
    },
});

const { reducer } = passwordSlice;

export default reducer;
