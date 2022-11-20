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

const construstorsSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        deleteBurderIngredient: (state, action) => {
            state.constructorIngredients = state.constructorIngredients && state.constructorIngredients.filter(
                (el, index) => index !== +action.payload
            );
            localStorage.removeItem("constructorIngredients");
            localStorage.setItem(
                "constructorIngredients",
                JSON.stringify(state.constructorIngredients)
            );
        },
        updateBurderIngredients: (state, action) => {
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
        seTingredientsWithoutBun: {
            reducer: (state, action) => {
                state.constructorIngredients = state.constructorIngredients
                    ? [...state.constructorIngredients, action.payload]
                    : [action.payload];

                localStorage.removeItem("constructorIngredients");
                localStorage.setItem(
                    "constructorIngredients",
                    JSON.stringify(state.constructorIngredients)
                );
            },
            prepare: (payload) => ({
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

const { actions, reducer } = construstorsSlice;

export default reducer;
export const { deleteBurderIngredient, updateBurderIngredients, seTingredientsWithoutBun, setBun } =
    actions;
