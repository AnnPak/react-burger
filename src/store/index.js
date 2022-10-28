import { configureStore } from "@reduxjs/toolkit";

import burgerConstructor from "./constructor/slice";
import ingredients from "./ingredients/slice";
import modal from "./modal/slice";
import order from "./order/slice";
import user from "./user/user";
import login from "./user/login";
import register from "./user/register";
import password from "./user/password";

const store = configureStore({
    reducer: { burgerConstructor, ingredients, modal, order, user, login, register, password },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
