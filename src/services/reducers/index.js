const initialState = {
    ingredients: [],
    ingredientsStatus: 'idle',

    typesOfIngredients: [],

    ingredientInModal: [],
    isIngredientModalVisible: false,

    burgerIngredients: [],
    burgerIngredientsStatus: 'idle',

    order: [],
    orderIngredients: [],
    orderStatus: 'idle',

    orderInModal: [],
    isOrderModalVisible: false,

    tabsValue: '',
 

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_ORDER_INGREDIENTS': {
            return {
                ...state, orderIngredients: action.payload
            }
        }

        case 'SET_TYPES_OF_ingredients': {
            return {
                ...state, typesOfIngredients: action.payload
            }
        }

        case 'SET_TAB_VALUE': {
            return {
                ...state, tabsValue: action.payload
            }
        }

        case 'GET_ORDER_REQUEST': {
            return {
                ...state, orderStatus: 'loading', isOrderModalVisible: true
            }
        }

        case 'GET_ORDER_SUCCESS': {
            return {
                ...state, order: action.payload, orderStatus: 'success',
            }
        }

        case 'GET_ORDER_FAILED': {
            return {
                ...state, orderStatus: 'error',
            }
        }

        case 'ADD_MODAL_INGREDIENT':{
            return {
                ...state, ingredientInModal: action.payload, isIngredientModalVisible: true,
            }
        }

        case 'ADD_MODAL_ORDER':{
            return {
                ...state, orderInModal: action.payload, isIngredientModalVisible: true
            }
        }

        case 'REMOVE_MODAL':{
            return {
               ...state, ingredientInModal: [], isIngredientModalVisible: false, orderInModal: [], isOrderModalVisible: false
            }
        }

        case 'GET_BURGER_INGREDIENTS_REQUEST':{
            return {
                ...state, burgerIngredientsStatus: 'loading'
            }
        }

        case 'GET_BURGER_INGREDIENTS_SUCCESS':{
            return {
                ...state, burgerIngredients: action.payload, burgerIngredientsStatus: 'success'
            }
        }

        case 'GET_BURGER_INGREDIENTS_FAILED':{
            return {
                ...state, burgerIngredientsStatus: 'error'
            }
        }

        case 'GET_INGREDIENTS_REQUEST':{
            return {
                ...state,
                ingredientsStatus: 'loading'
            }
        }

        case 'GET_INGREDIENTS_SUCCESS':{
            return {
                ...state, ingredients: action.payload, ingredientsStatus: 'success'
            }
        }

        case 'GET_INGREDIENTS_FAILED':{
            return {
                ...state, ingredientsStatus: 'error'
            }
        }

        case 'ADD_COMPONENT_TO_CONSTRUCTOR': {
            return {
                ...state, 
                burgerIngredients: [ ...state.burgerIngredients, action.payload]
            }
        }

        case 'REMOVE_COMPONENT_FROM_CONSTRUCTOR': {
            return {
                ...state, 
                burgerIngredients: [ ...state.burgerIngredients, action.payload]
            }
        }

        case 'REPLASE_BUN_COMPONENT': {
            return {
                ...state, 
                burgerIngredients: state.burgerIngredients.map(ingregient => ingregient.type === "bun" ? action.payload : ingregient)
            }
        }

        case 'UPDATE_CONSTRUCTOR_LIST': {
            return {
                ...state, 
                burgerIngredients: action.payload ?  action.payload : state.burgerIngredients
            }
        }

        case 'SORT_CONSTRUCTOR_LIST': {

            return {
                ...state, 
                burgerIngredients: action.payload
            }
        }
        

        default: {
            return state;
        }


    }
}

export default rootReducer;