import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import request from '../../utils/request';
import { ordersApi } from '../../utils/constants';

const initialState = {
    orderNumber: null,
    orderIngredients: null,
    orderStatus: 'idle',
}

export const fetchOrder = createAsyncThunk(
    'order/fetchFilters',
    async (requestBody) => {
        return await request(ordersApi, requestBody, 'POST')
    }
);

const ingredientsSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderIngredients: (state, action) => {
            state.orderIngredients = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, state => { state.orderStatus = 'loading' })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number;
                state.orderStatus = 'success';
                state.constructorIngredients = null;
                state.bun = null;
            })
            .addCase(fetchOrder.rejected, state => { state.orderStatus = 'error' })
            .addDefaultCase(() => { })
    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    setOrderIngredients,
} = actions