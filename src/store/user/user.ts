import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserData, fetchWithRefresh } from "../../utils/request";
import { GET_USER } from "../../utils/constants";

const initialState = {
    user: null,
    userSending: false,
    userError: false,

    refreshTokenSending: false,
    refreshTokenError: false,
};

export const userFetchWithRefresh = createAsyncThunk(
    "user/userFetchWithRefresh",
    async (options:RequestInit) => {
        return await fetchWithRefresh(GET_USER, options).then((data) => {
            return data;
        });
    }
);

export const userRequest = createAsyncThunk(
    "user/userRequest",
    async (options:RequestInit) => {
        return await updateUserData(GET_USER, options  ).then((data) => {
            return data;
        });
    }
);

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
            });
    },
});

const { reducer } = userSlice;

export default reducer;
