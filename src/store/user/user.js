import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";

import { requestUser, requestToken } from "../../utils/request";
import { GET_USER, TOKEN_API } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123
    userSending: false,
    userError: false,
    jwtExpired: false,

    refreshTokenSending: false,
    refreshTokenError: false,
    
};

const token = getCookie("accessToken");
const refreshTokenValue = getCookie("refreshToken");

export const getUser = createAsyncThunk("user/getUser", async () => {
    return await requestUser(GET_USER, token)
    .then(data => {
        return data
      });
});

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
    return await requestToken(TOKEN_API, refreshTokenValue)
    .then(res => res.json())
    .then(data => {
        console.log(data) 

        return data
      });
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.userSending = true;
                state.loginError = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const {success, user} = action.payload

                state.userSending = false;
                state.userError = success ? false : true;
                state.user = success && user;

                state.jwtExpired = !success && action.payload.message === 'jwt expired' ? true : false; //проверка если токен просрочен
            })
            .addCase(getUser.rejected, (state, action) => {
                console.log(action.payload)
                state.userSending = false;
                state.userError = true;
            })
            
            .addCase(refreshToken.pending, (state) => {
                state.refreshTokenSending = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                const {success, accessToken} = action.payload

                state.refreshTokenSending = false;
                state.jwtExpired = false;
                success && setCookie("accessToken", accessToken);
            })
            .addCase(refreshToken.rejected, (state) => {
                state.refreshTokenError = true;
                state.refreshTokenSending = false;
            })

    },
});

const { reducer } = userSlice;

export default reducer;
