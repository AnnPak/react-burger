import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type OrdersInitState = {
    orders: Array<TOrder> | null;
    total?: number | null;
    totalToday?: number | null;
    userOrders: Array<TOrder> | null;
    isWsOpen: boolean | null;
    isWsUserOpen: boolean | null;
};

export const initialState: OrdersInitState = {
    orders: null,
    total: null,
    totalToday: null,
    userOrders: null,
    isWsOpen: null,
    isWsUserOpen: null
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
            state.isWsOpen = type === "close" ? true : false;
        },
        wsConnecting: (state, action) => {
            console.log(action.payload);
        },
        wsUserClose: (state, action) => {
            const { type } = action.payload;
            state.isWsUserOpen = type === "close" ? true : false;
        },
        wsConnect: (state, action) => {
            const { type } = action.payload;
            console.log(action.payload);
            state.isWsOpen = type === "open" ? true : false;
        },
        wsUserConnect: (state, action) => {
            const { type } = action.payload;
            state.isWsUserOpen = type === "open" ? true : false;
        },
    },
});

const { actions, reducer } = feedSlice;
export const { wsMessage, wsUserMessage, wsConnect, wsClose, wsUserClose, wsUserConnect } = actions;
export { reducer as feedReducer}
export default reducer;
