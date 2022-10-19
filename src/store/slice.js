import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ingredients: [],
    ingredientsStatus: 'idle',

    typesOfIngredients: [],

    ingredientInModal: [],
    isIngredientModalVisible: false,

    burgerIngredients: [],
    burgerIngredientsStatus: 'idle',
    ingredientsWithoutBun: [],

    order: [],
    orderIngredients: [],
    orderStatus: 'idle',

    orderInModal: [],
    isOrderModalVisible: false,

    tabsValue: '',
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
        getBurderIngredientsFailed: state => {state.burgerIngredientsStatus = 'error'},

        updateBurderIngredients: (state, action) => {state.ingredientsWithoutBun = action.payload ? action.payload : state.ingredientsWithoutBun},//rename
        addBurgerIngredient: (state, action) => {
            state.burgerIngredients = [ ...state.burgerIngredients, action.payload];
            state.ingredientsWithoutBun = action.payload.type !== "bun" ? [ ...state.ingredientsWithoutBun, action.payload] : state.ingredientsWithoutBun;
        },
        replaceBurderIngredientBun: (state, action) => {
            state.burgerIngredients = state.burgerIngredients.map(ingregient => ingregient.type === "bun" ? action.payload : ingregient);
        },

        getOrderRequest: state  => {
            state.orderStatus = 'loading';
            state.isOrderModalVisible = true
        },
        getOrderSuccess: ( state, action ) => {
            state.order = action.payload; 
            state.orderStatus = 'success';
        },
        getOrderFailed: state => {state.orderStatus = 'error'},
        setOrderIngredients: ( state, action ) => {
            state.orderIngredients = action.payload; 
        }, 


        addIngredientToModal: ( state, action ) => {
            state.ingredientInModal = action.payload; 
            state.isIngredientModalVisible = true;
        }, 

        addOrderToModal: ( state, action ) => {
            state.orderInModal = action.payload; 
            state.isIngredientModalVisible = true;
        }, 
        removeModal: state => {
            state.ingredientInModal = [];
            state.isIngredientModalVisible = false; 
            state.orderInModal = []; 
            state.isOrderModalVisible = false
        }, 

        setTabsValue: ( state, action ) => {
            state.tabsValue = action.payload; 
        }, 
        
        setTypesOfIngredients: ( state, action ) => {
            state.typesOfIngredients = action.payload; 
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
    updateBurderIngredients,
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