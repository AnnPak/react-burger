import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../../utils/request";
import { INGREDIENTS_API } from "../../../utils/constants";
import { TIngredient } from "../../../utils/types";

export type TIngredientsState = {
    ingredients: null | Array<TIngredient>
    isLoading: boolean
    isError: boolean
}

const initialState:TIngredientsState = {
    ingredients: null,
    isLoading: false,
    isError: false,
};

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
    return await request(INGREDIENTS_API);
});

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.ingredients = null;
            })

    },
});

const { reducer } = ingredientsSlice;

export { reducer as ingredientsReducer}
export default reducer;
