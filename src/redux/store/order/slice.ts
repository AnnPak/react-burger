import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { requestCreateOrder } from "../../../utils/request";
import { ORDERS_API } from "../../../utils/constants";
import { TFetchOrder } from "../../../utils/types";

export type TOrderState = {
    orderNumber: null | number
    orderStatus: string
}

const initialState:TOrderState = {
    orderNumber: null,
    orderStatus: "idle",
};

export const createOrder = createAsyncThunk("order/createOrder", async (requestBody:TFetchOrder) => {
    return await requestCreateOrder(ORDERS_API, JSON.stringify(requestBody), "POST");
});

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.orderStatus = "loading";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number;
                state.orderStatus = "success";
            })
            .addCase(createOrder.rejected, (state) => {
                state.orderStatus = "error";
                state.orderNumber = null;
            });
    },
});

const { reducer } = orderSlice;
export {reducer as orderReducer}
export default reducer;
