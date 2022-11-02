import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateUserData, fetchWithRefresh } from "../../utils/request";
import { GET_USER, TOKEN_API } from "../../utils/constants";

const initialState = {
    user: null, //anna1 anna@anna.com anna123
    userSending: false,
    userError: false,

    refreshTokenSending: false,
    refreshTokenError: false,
    
};

export const fetchRefresh = createAsyncThunk("user/fetchRefresh", async (options) => {
    return await fetchWithRefresh({url: GET_USER, options})
    .then(data => {
        return data
      });
});

export const userRequest = createAsyncThunk("user/userRequest", async ({headers, method, body}) => {
    return await updateUserData({url: GET_USER, headers, method, body})
    .then(data => {
        return data
      });
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefresh.pending, (state) => {
                state.refreshTokenSending = true;
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                const {success, user} = action.payload
                state.userSending = false;
                state.userError = success ? false : true;
                state.user = success && user;
                // success && setCookie("accessToken", accessToken);
            })
            .addCase(fetchRefresh.rejected, (state) => {
                state.refreshTokenError = true;
                state.refreshTokenSending = false;
            })

    },
});

const { reducer } = userSlice;

export default reducer;
