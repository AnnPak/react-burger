import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    constructorIngredients: null,
    bun: null,
}

const ingredientsSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        deleteBurderIngredient: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter((el, index) => index !== +action.payload);
        },
        updateBurderIngredients: (state, action) => { state.constructorIngredients = action.payload ? action.payload : state.constructorIngredients },

        setBun: (state, action) => { state.bun = action.payload; },
        setIngredientsWithoutBun: (state, action) => {
            state.constructorIngredients = state.constructorIngredients ? [...state.constructorIngredients, action.payload] : [action.payload];
        },
    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    deleteBurderIngredient,
    updateBurderIngredients,
    setIngredientsWithoutBun,
    setBun,
} = actions