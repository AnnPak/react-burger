import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { LOGOUT_API } from "../../utils/constants";
import { deleteCookie, getCookie } from "../../utils/cookie";

const initialState = {
    logoutSending: false,
    logoutSuccess: false,
    logoutError: false,
};

export const logoutUser = createAsyncThunk("user/logoutUser", async (requestBody) => {
    return await request(LOGOUT_API, requestBody, "POST");
});


const logoutSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.logoutSending = true;
                state.logoutError = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                const { success} = action.payload

                state.logoutSending = false;
                state.logoutError = false;
                success && deleteCookie('refreshToken') 
                success && deleteCookie('accessToken') 
            })
            .addCase(logoutUser.rejected, (state) => {
                state.logoutSending = false;
                state.logoutError = true;
            })
    },
});

const { reducer } = logoutSlice;

export default reducer;
