import { TStringArray } from '../../../utils/types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../../utils/request";
import { setCookie } from "../../../utils/cookie";
import { REGISTER_API } from "../../../utils/constants";

export type TRegisterState = {
    registerSending: boolean,
    registerSuccess: null | boolean,
    registerError: boolean,
}

const initialState:TRegisterState = {
    registerSending: false,
    registerError: false,
    registerSuccess: null,
};

export const registerUser = createAsyncThunk("user/registerUser", async (requestBody:TStringArray) => {
    return await request(REGISTER_API, JSON.stringify(requestBody), "POST");
});

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerSending = true;
                state.registerError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken, success } = action.payload;

                state.registerSending = false;
                state.registerError = false;
                state.registerSuccess = success ? true : false;

                setCookie("accessToken", accessToken, null);
                localStorage.setItem("refreshToken", refreshToken);
                success ? localStorage.setItem("isUserLogged", 'true') : localStorage.setItem("isUserLogged", 'false');
            })
            .addCase(registerUser.rejected, (state) => {
                localStorage.setItem("isUserLogged", 'false');
                state.registerSending = false;
                state.registerError = true;
                state.registerSuccess = false;
            });
    },
});

const { reducer } = registerSlice;

export {reducer as registerReducer}
export default reducer;
