import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type OrdersInitState = {
    orders: Array<TOrder> | null;
    total?: number | null;
    totalToday?: number | null;
    userOrders: Array<TOrder> | null;
    isWsOpen: boolean | null;
    isUserWsOpen: boolean | null;
    wsOrdersStatus: string | null;
    wsUserStatus: string | null;
};

export const initialState: OrdersInitState = {
    orders: null,
    total: null,
    totalToday: null,
    userOrders: null,
    isWsOpen: null,
    isUserWsOpen: null,
    wsOrdersStatus: null,
    wsUserStatus: null,
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsMessage_orders: (state, action) => {
            const { orders, total, totalToday } = action.payload;
            state.orders = orders;
            state.total = total;
            state.totalToday = totalToday;
        },
        wsConnect_orders: (state, action) => {
            const { type } = action.payload;
            state.isWsOpen = type === "open" ? true : false;
            state.wsOrdersStatus = type;
        },
        wsClose_orders: (state) => {
            state.isWsOpen = false;
            state.wsUserStatus = 'close';
        },
        wsError_orders: (state) => {
            state.wsUserStatus = 'error';
        },
        wsConnecting_orders: (state) => {
            state.wsOrdersStatus = 'connecting';
        },
        wsMessage_userOrders: (state, action) => {
            const { orders, total, totalToday } = action.payload;
            state.userOrders = orders;
            state.total = total;
            state.totalToday = totalToday;
        },
        wsConnect_userOrders: (state, action) => {
            const { type } = action.payload;
            state.isWsOpen = type === "open" ? true : false;
            state.wsUserStatus = type;
        },
        wsError_userOrders: (state) => {
            state.wsUserStatus = 'error';
        },
        wsClose_userOrders: (state) => {
            state.isUserWsOpen = false;
            state.wsUserStatus = 'close';
        },
        wsConnecting_userOrders: (state) => {
            state.wsUserStatus = 'connecting';
        },
    },
});

const { actions, reducer } = feedSlice;
export const {
    wsMessage_orders,
    wsConnect_orders,
    wsClose_orders,
    wsError_orders,
    wsMessage_userOrders,
    wsConnect_userOrders,
    wsClose_userOrders,
    wsError_userOrders,
    wsConnecting_userOrders,
    wsConnecting_orders
} = actions;
export { reducer as feedReducer };
export default reducer;
