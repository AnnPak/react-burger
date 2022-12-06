import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type OrdersInitState = {
    orders: Array<TOrder> | null;
    total?: number | null;
    totalToday?: number | null;
    userOrders: Array<TOrder> | null;
    isSocketOpen: boolean | null;
};

export const initialState: OrdersInitState = {
    orders: null,
    total: null,
    totalToday: null,
    userOrders: null,
    isSocketOpen: null,
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsMessage: (state, action) => {
            const { orders, total, totalToday } = action.payload;
            state.orders = orders;
            state.total = total;
            state.totalToday = totalToday;
        },
        wsUserMessage: (state, action) => {
            const { orders, total, totalToday } = action.payload;
            state.userOrders = orders;
            state.total = total;
            state.totalToday = totalToday;
        },
        wsClose: (state, action) => {
            const { type } = action.payload;
            state.isSocketOpen = type === "close" ? true : false;
        },
        wsUserClose: (state, action) => {
            const { type } = action.payload;
            state.isSocketOpen = type === "close" ? true : false;
        },
        wsConnect: (state, action) => {
            const { type } = action.payload;
            state.isSocketOpen = type === "open" ? true : false;
        },
        wsUserConnect: (state, action) => {
            const { type } = action.payload;
            state.isSocketOpen = type === "open" ? true : false;
        },
    },
});

const { actions, reducer } = feedSlice;
export const { wsMessage, wsUserMessage, wsConnect, wsClose, wsUserClose, wsUserConnect } = actions;
export default reducer;
