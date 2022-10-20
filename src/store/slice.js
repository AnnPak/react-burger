import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ingredients: null,
    ingredientsStatus: 'idle',

    burgerIngredients: null,
    burgerIngredientsStatus: 'idle',
    ingredientsWithoutBun: null,

    orderNumber: null,
    orderIngredients: null,
    orderStatus: 'idle',

    isOrderModalVisible: false,
    ingredientInModal: null,
}

const ingredientsSlice  = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredientsRequest: state  => {state.ingredientsStatus = 'loading'},
        getIngredientsSuccess: ( state, action ) => {
            state.ingredients = action.payload; 
            state.ingredientsStatus = 'success';
        },
        getIngredientsFailed: state => {state.ingredientsStatus = 'error'},

        getBurderIngredientsRequest: state => {state.burgerIngredientsStatus = 'loading'},
        getBurderIngredientsSuccess: (state, action) => {
            state.burgerIngredients = action.payload;
            state.burgerIngredientsStatus = 'success';
        } ,
        deleteBurderIngredient: (state, action) => {
            state.burgerIngredients = state.burgerIngredients.filter((el, index) => index !== action.payload);
        },
        getBurderIngredientsFailed: state => {state.burgerIngredientsStatus = 'error'},

        updateBurderIngredients: (state, action) => {state.ingredientsWithoutBun = action.payload ? action.payload : state.ingredientsWithoutBun},//rename
        addBurgerIngredient: (state, action) => {
            state.burgerIngredients = state.burgerIngredients ? [ ...state.burgerIngredients, action.payload] : [action.payload] ;
        },
        setIngredientsWithoutBun: ( state, action ) => {
            state.ingredientsWithoutBun = action.payload; 
        }, 
        replaceBurderIngredientBun: (state, action) => {
            state.burgerIngredients = state.burgerIngredients.map(ingregient => ingregient.type === "bun" ? action.payload : ingregient);
        },

        getOrderRequest: state  => {
            state.orderStatus = 'loading';
        },
        getOrderSuccess: ( state, action ) => {
            state.orderNumber = action.payload; 
            state.orderStatus = 'success';
            state.burgerIngredients = null;
        },
        getOrderFailed: state => {state.orderStatus = 'error'},
        setOrderIngredients: ( state, action ) => {
            state.orderIngredients = action.payload; 
        }, 


        addIngredientToModal: ( state, action ) => {
            state.ingredientInModal = action.payload; 
        }, 

        addOrderToModal: state  => {
            state.isOrderModalVisible = true; 
        }, 
        removeModal: state => {
            state.ingredientInModal = null;
            state.isOrderModalVisible = false ; 
        },
        
    }

})

const {actions, reducer} =  ingredientsSlice;

export default reducer;
export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,
    getBurderIngredientsRequest,
    getBurderIngredientsSuccess,
    getBurderIngredientsFailed,
    deleteBurderIngredient,
    updateBurderIngredients,
    setIngredientsWithoutBun,
    addBurgerIngredient,
    replaceBurderIngredientBun,
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    setOrderIngredients,
    addIngredientToModal,
    addOrderToModal,
    removeModal, 
    setTabsValue, 
    setTypesOfIngredients,
} = actions