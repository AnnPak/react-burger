import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { LOGOUT_API } from "../../utils/constants";
import { deleteCookie, setCookie } from "../../utils/cookie";

const initialState = {
    logoutSending: false,
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
                const { success } = action.payload;

                state.logoutSending = false;
                state.logoutError = false;
                success && deleteCookie("refreshToken");
                success && deleteCookie("accessToken");
                success && localStorage.removeItem("bun");
                success && localStorage.removeItem("constructorIngredients");
                success && setCookie("isUserLogged", false)
            })
            .addCase(logoutUser.rejected, (state) => {
                state.logoutSending = false;
                state.logoutError = true;
            });
    },
});

const { reducer } = logoutSlice;

export default reducer;
