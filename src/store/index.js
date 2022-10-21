import { configureStore } from "@reduxjs/toolkit";

import burgerConstructor from "./constructor/slice";
import ingredients from "./ingredients/slice";
import modal from "./modal/slice";
import order from "./order/slice";

const store = configureStore({
    reducer: { burgerConstructor, ingredients, modal, order },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
