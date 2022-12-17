import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../../utils/request";
import { FORGOT_PSSWRD } from "../../../utils/constants";
import { TStringArray } from "../../../utils/types";

export type TPasswordState = {
    forgotSending: boolean,
    forgotSuccess: boolean,
    forgotError: boolean,

    resetSending: boolean,
    resetSuccess: boolean,
    resetError: boolean,
}

const initialState:TPasswordState = {
    forgotSending: false,
    forgotSuccess: false,
    forgotError: false,

    resetSending: false,
    resetSuccess: false,
    resetError: false,
};

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword", 
    async (requestBody:TStringArray) => {
    return await request(FORGOT_PSSWRD, JSON.stringify(requestBody), "POST");
});

export const resetPassword = createAsyncThunk("user/resetPassword", async (requestBody:TStringArray) => {
    return await request(FORGOT_PSSWRD, JSON.stringify(requestBody), "POST");
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

export { reducer as passwordReducer };
export default reducer;
