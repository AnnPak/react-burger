import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserData, fetchWithRefresh, request } from "../../utils/request";
import { GET_USER, LOGIN_API } from "../../utils/constants";
import { setCookie } from "../../utils/cookie";

type TUserState = {
    user: any,
    userSending: boolean,
    userError: boolean,
    isLoggedIn:boolean,

    refreshTokenSending: boolean,
    refreshTokenError: boolean,

    loginSending: boolean;
    loginSuccess: null | boolean;
    loginError: boolean;
    
};

const initialState:TUserState = {
    user: null,
    userSending: false,
    userError: false,
    isLoggedIn:false,

    refreshTokenSending: false,
    refreshTokenError: false,

    loginSending: false,
    loginSuccess: null,
    loginError: false,
};

export const userFetchWithRefresh = createAsyncThunk(
    "user/userFetchWithRefresh",
    async (options:RequestInit) => {
        return await fetchWithRefresh(GET_USER, options).then((data) => {
            return data;
        });
    }
);

export const userUpdate = createAsyncThunk(
    "user/userUpdate",
    async (options:RequestInit) => {
        return await updateUserData(GET_USER, options  ).then((data) => {
            return data;
        });
    }
);

export const loginUser = createAsyncThunk("user/loginUser", async (requestBody: string) => {
    return await request(LOGIN_API, requestBody, "POST");
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFetchWithRefresh.pending, (state) => {
                state.refreshTokenSending = true;
            })
            .addCase(userFetchWithRefresh.fulfilled, (state, action) => {
                const { success, user } = action.payload;
                state.userSending = false;
                state.userError = success ? false : true;
                state.user = success && user;
                success
                    ? localStorage.setItem("isUserLogged", 'true')
                    : localStorage.setItem("isUserLogged", 'false');
            })
            .addCase(userFetchWithRefresh.rejected, (state) => {
                localStorage.setItem("isUserLogged", 'false');
                state.refreshTokenError = true;
                state.refreshTokenSending = false;
            })

            .addCase(loginUser.pending, (state) => {
                state.loginSending = true;
                state.loginError = false;
                
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken, success, user } = action.payload;

                state.loginSending = false;
                state.loginError = false;
                state.loginSuccess = success ? true : false;
                state.user = user;
                
                success && setCookie("accessToken", accessToken, null);
                success && localStorage.setItem("refreshToken", refreshToken);
                success && localStorage.setItem("isUserLogged", "true");
            })
            .addCase(loginUser.rejected, (state) => {
                state.loginSending = false;
                state.loginError = true;
                state.loginSuccess = false;
                localStorage.setItem("isUserLogged", "false");
            });
    },
});

const { reducer } = userSlice;

export default reducer;
