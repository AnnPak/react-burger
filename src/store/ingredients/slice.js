import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import request from "../../utils/request";
import { ingredientsApi } from "../../utils/constants";

const initialState = {
    ingredients: null,
    isLoading: false,
    isError: false,
};

export const fetchIngredients = createAsyncThunk("ingredients/fetchFilters", async () => {
    return await request(ingredientsApi);
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
            .addDefaultCase(() => {});
    },
});

const { reducer } = ingredientsSlice;

export default reducer;
