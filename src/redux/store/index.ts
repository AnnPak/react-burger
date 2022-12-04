import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import burgerConstructor from "./constructor/slice";
import ingredients from "./ingredients/slice";
import modal from "./modal/slice";
import order from "./order/slice";
import user from "./user/user";
import logout from "./user/logout";
import register from "./user/register";
import password from "./user/password";
import feed from "./feed/slice";
import { socketMiddleware } from "../middleware/socket-middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
    middleware: getDefaultMiddleware({ serializableCheck: false }).concat(
        socketMiddleware("wss://norma.nomoreparties.space/orders/all")
    ),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
