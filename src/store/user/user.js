import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { setCookie } from "../../utils/cookie";
import { GET_USER } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123
};

export const getUser = createAsyncThunk("user/getUser", async (requestBody) => {
    return await request(GET_USER, requestBody);
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loginSending = true;
                state.loginError = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loginSending = false;
                state.loginError = false;

                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                setCookie("accessToken", state.accessToken);
                setCookie("refreshToken", state.refreshToken);
            })
            .addCase(getUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
            });
    },
});

const { reducer } = userSlice;

export default reducer;
