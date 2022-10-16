const initialState = {
    ingregients: [],
    ingregientsStatus: 'idle',

    ingredientInModal: [],
    isIngredientModalVisible: false,

    burgerIngregients: [],
    burgerIngregientsStatus: 'idle',

    order: [],
    orderStatus: 'idle',

    orderInModal: [],
    isOrderModalVisible: false,


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default: {
            return state;
        }


    }
}

export default rootReducer;