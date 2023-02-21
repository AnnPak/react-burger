import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import burgerConstructor from "./constructor/constructor";
import ingredients from "./ingredients/slice";
import modal from "./modal/slice";
import order from "./order/slice";
import user from "./user/user";
import logout from "./user/logout";
import register from "./user/register";
import password from "./user/password";
import feed, {  wsMessage_orders,
    wsConnect_orders,
    wsClose_orders,
    wsError_orders,
    wsConnecting_orders,
    wsMessage_userOrders,
    wsConnect_userOrders,
    wsClose_userOrders,
    wsError_userOrders,
    wsConnecting_userOrders,
 } from "./feed/slice";

import { socketMiddleware } from "../middleware/socket-middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TwsActionTypes } from "../../utils/types";



export const ordersWsActions:TwsActionTypes = {
    wsConnect: wsConnect_orders,
    wsConnecting: wsConnecting_orders,
    wsClose: wsClose_orders,
    wsError: wsError_orders,
    wsMessage: wsMessage_orders,
}
export const userOrdersWsActions:TwsActionTypes = {
    wsConnect: wsConnect_userOrders,
    wsConnecting: wsConnecting_userOrders,
    wsClose: wsClose_userOrders,
    wsError: wsError_userOrders,
    wsMessage: wsMessage_userOrders,
}

const store = configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        modal,
        order,
        user,
        register,
        password,
        logout,
        feed,
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(ordersWsActions), socketMiddleware(userOrdersWsActions)),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
