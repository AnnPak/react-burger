import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: null,
    isLoading: false,
    isError: false
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredientsRequest: state => { state.isLoading = true; state.isError = false},
        getIngredientsSuccess: (state, action) => {
            state.ingredients = action.payload;
            state.isLoading = false;
            state.isError = false
        },
        getIngredientsFailed: state => { state.isLoading = false; state.isError = true},
    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,

} = actions