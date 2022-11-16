import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOptionsProps } from "../../utils/types";
import { updateUserData, fetchWithRefresh } from "../../utils/request";
import { GET_USER } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123
    userSending: false,
    userError: false,

    refreshTokenSending: false,
    refreshTokenError: false,
};

export const userFetchWithRefresh = createAsyncThunk(
    "user/userFetchWithRefresh",
    async (options:TOptionsProps) => {
        return await fetchWithRefresh({ url: GET_USER, options }).then((data) => {
            return data;
        });
    }
);

export const userRequest = createAsyncThunk(
    "user/userRequest",
    async ({ headers, method, body }) => {
        return await updateUserData({ url: GET_USER, headers, method, body }).then((data) => {
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
                    ? localStorage.setItem("isUserLogged", true)
                    : localStorage.setItem("isUserLogged", false);
            })
            .addCase(userFetchWithRefresh.rejected, (state) => {
                localStorage.setItem("isUserLogged", false);
                state.refreshTokenError = true;
                state.refreshTokenSending = false;
            });
    },
});

const { reducer } = userSlice;

export default reducer;
