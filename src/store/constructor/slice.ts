import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from './../../utils/types';
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { fetchOrder } from "../order/slice";

export type TConstructorState = {
    constructorIngredients: null | Array<TIngredient>
    bun: null | TIngredient
}
  
const initialState:TConstructorState = {
    constructorIngredients: null,
    bun: null,
};

const constructorsSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        deleteBurgerIngredient: (state, action) => {
            state.constructorIngredients = state.constructorIngredients && state.constructorIngredients.filter(
                (el, index) => index !== +action.payload
            );
            localStorage.removeItem("constructorIngredients");
            localStorage.setItem(
                "constructorIngredients",
                JSON.stringify(state.constructorIngredients)
            );
        },
        updateBurgerIngredients: (state, action) => {
            state.constructorIngredients = action.payload
                ? action.payload
                : state.constructorIngredients;

            localStorage.removeItem("constructorIngredients");
            localStorage.setItem(
                "constructorIngredients",
                JSON.stringify(state.constructorIngredients)
            );
        },
        setBun: (state, action) => {
            state.bun = action.payload;
            localStorage.removeItem("bun");
            localStorage.setItem("bun", JSON.stringify(state.bun));
        },
        setIngredientsWithoutBun: {
            reducer: (state, action:PayloadAction<TIngredient>) => {
                state.constructorIngredients = state.constructorIngredients
                    ? [...state.constructorIngredients, action.payload]
                    : [action.payload];

                localStorage.removeItem("constructorIngredients");
                localStorage.setItem(
                    "constructorIngredients",
                    JSON.stringify(state.constructorIngredients)
                );
            },
            prepare: (payload:TIngredient) => ({
                payload: {
                    ...payload,
                    key: nanoid(),
                },
            }),
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.fulfilled, (state) => {
            state.constructorIngredients = null;
            state.bun = null;
        });
    },
});

const { actions, reducer } = constructorsSlice;

export default reducer;
export const { deleteBurgerIngredient, updateBurgerIngredients, setIngredientsWithoutBun, setBun } =
    actions;
