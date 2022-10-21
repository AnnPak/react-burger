import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ingredients: null,
    ingredientsStatus: 'idle',

    burgerIngredients: null,
    ingredientsWithoutBun: null,
    bun: null,

    orderNumber: null,
    orderIngredients: null,
    orderStatus: 'idle',

    isOrderModalVisible: false,
    ingredientInModal: null,
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

        deleteBurderIngredient: (state, action) => {
            state.ingredientsWithoutBun = state.ingredientsWithoutBun.filter((el, index) => index !== +action.payload);
        },
        updateBurderIngredients: (state, action) => { state.ingredientsWithoutBun = action.payload ? action.payload : state.ingredientsWithoutBun },

        setBun: (state, action) => { state.bun = action.payload; },
        setIngredientsWithoutBun: (state, action) => {
            state.ingredientsWithoutBun = state.ingredientsWithoutBun ? [...state.ingredientsWithoutBun, action.payload] : [action.payload];
        },

        getOrderRequest: state => { state.orderStatus = 'loading'; },
        getOrderSuccess: (state, action) => {
            state.orderNumber = action.payload;
            state.orderStatus = 'success';
            state.burgerIngredients = null;
        },
        getOrderFailed: state => { state.orderStatus = 'error' },
        setOrderIngredients: (state, action) => { state.orderIngredients = action.payload; },

        addIngredientToModal: (state, action) => { state.ingredientInModal = action.payload; },

        addOrderToModal: state => { state.isOrderModalVisible = true; },
        removeModal: state => {
            state.ingredientInModal = null;
            state.isOrderModalVisible = false;
        },

    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,
    deleteBurderIngredient,
    updateBurderIngredients,
    setIngredientsWithoutBun,
    setBun,
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    setOrderIngredients,
    addIngredientToModal,
    addOrderToModal,
    removeModal,
} = actions