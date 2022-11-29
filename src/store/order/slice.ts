import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../utils/request";
import { ORDERS_API } from "../../utils/constants";
import { TStringArray } from "../../utils/types";

export type TOrderState = {
    orderNumber: null | number
    orderStatus: string
}

const initialState:TOrderState = {
    orderNumber: null,
    orderStatus: "idle",
};

type TFetchOrder = {
    ingredients: Array<string | null >
    Authorization: string
}


export const fetchOrder = createAsyncThunk("order/fetchOrder", async (requestBody:TFetchOrder) => {
    return await request(ORDERS_API, JSON.stringify(requestBody), "POST");
});

const orderSlice = createSlice({
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
                
                localStorage.removeItem("bun");
                localStorage.removeItem("constructorIngredients");
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orderStatus = "error";
                state.orderNumber = null;
            });
    },
});

const { reducer } = orderSlice;

export default reducer;
