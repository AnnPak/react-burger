import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: null,
    ingredientsStatus: 'idle',
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredientsRequest: state => { state.ingredientsStatus = 'loading' },
        getIngredientsSuccess: (state, action) => {
            state.ingredients = action.payload;
            state.ingredientsStatus = 'success';
        },
        getIngredientsFailed: state => { state.ingredientsStatus = 'error' },
    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,
} = actions