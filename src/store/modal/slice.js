import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOrderModalVisible: false,
    ingredientInModal: null,
}

const ingredientsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addIngredientToModal: (state, action) => { 
            state.ingredientInModal = action.payload; 
        },

        addOrderToModal: state => { 
            state.isOrderModalVisible = true; 
        },

        removeModal: state => {
            state.ingredientInModal = null;
            state.isOrderModalVisible = false;
        },
    }
})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {   
    addIngredientToModal,
    addOrderToModal,
    removeModal,
} = actions