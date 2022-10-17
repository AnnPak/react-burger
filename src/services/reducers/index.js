const initialState = {
    ingregients: [],
    ingregientsStatus: 'idle',

    typesOfIngredients: [],

    ingredientInModal: [],
    isIngredientModalVisible: false,

    burgerIngregients: [],
    burgerIngregientsStatus: 'idle',

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

        case 'SET_TYPES_OF_INGREGIENTS': {
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
                ...state, burgerIngregientsStatus: 'loading'
            }
        }

        case 'GET_BURGER_INGREDIENTS_SUCCESS':{
            return {
                ...state, burgerIngregients: action.payload, burgerIngregientsStatus: 'success'
            }
        }

        case 'GET_BURGER_INGREDIENTS_FAILED':{
            return {
                ...state, burgerIngregientsStatus: 'error'
            }
        }

        case 'GET_INGREDIENTS_REQUEST':{
            return {
                ...state,
                ingregientsStatus: 'loading'
            }
        }

        case 'GET_INGREDIENTS_SUCCESS':{
            return {
                ...state, ingregients: action.payload, ingregientsStatus: 'success'
            }
        }

        case 'GET_INGREDIENTS_FAILED':{
            return {
                ...state, ingregientsStatus: 'error'
            }
        }

        case 'ADD_COMPONENT': {
            return {
                ...state, 
                burgerIngregients: [ ...state.burgerIngregients, action.payload]
            }
        }

        case 'REPLASE_BUN_COMPONENT': {
            return {
                ...state, 
                burgerIngregients: state.burgerIngregients.map(ingregient => ingregient.type === "bun" ? action.payload : ingregient)
            }
        }

        default: {
            return state;
        }


    }
}

export default rootReducer;