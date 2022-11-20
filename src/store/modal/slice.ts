import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

export type TModalState = {
    ingredientInModal: null | Array<TIngredient>
    isOrderModalVisible: boolean
}

const initialState:TModalState = {
    isOrderModalVisible: false,
    ingredientInModal: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        addIngredientToModal: (state, action) => {
            state.ingredientInModal = action.payload;
        },

        addOrderToModal: (state) => {
            state.isOrderModalVisible = true;
        },

        removeModal: (state) => {
            state.ingredientInModal = null;
            state.isOrderModalVisible = false;
        },
    },
});

const { actions, reducer } = modalSlice;

export default reducer;
export const { addIngredientToModal, addOrderToModal, removeModal } = actions;
