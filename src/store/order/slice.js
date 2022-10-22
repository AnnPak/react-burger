import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import request from "../../utils/request";
import { ORDERS_API } from "../../utils/constants";

const initialState = {
    orderNumber: null,
    orderStatus: "idle",
};

export const fetchOrder = createAsyncThunk("order/fetchFilters", async (requestBody) => {
    return await request(ORDERS_API, requestBody, "POST");
});

const ingredientsSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.orderStatus = "loading";
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number;
                state.orderStatus = "success";
                state.bun = null;
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orderStatus = "error";
                state.orderNumber = null;
            })
    },
});

const { reducer } = ingredientsSlice;

export default reducer;
