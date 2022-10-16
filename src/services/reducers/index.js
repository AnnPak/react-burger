const initialState = {
    ingregients: [],
    ingregientsRequest: false,
    ingregientsFailed: false,

    burgerIngregients: [],
    burgerIngregientsRequest: false,
    burgerIngregientsFailed: false,

    ingredientInModal: [],
    isModalVisible: false,

    order: [],

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MODAL_INGREDIENT':{
            return {
                ...state, ingredientInModal: action.payload, isModalVisible: true
            }
        }

        case 'REMOVE_MODAL_INGREDIENT':{
            return {
               ...state, ingredientInModal: [], isModalVisible: false,
            }
        }

        case 'GET_BURGER_INGREDIENTS_REQUEST':{
            return {
                ...state, burgerIngregientsRequest: true
            }
        }

        case 'GET_BURGER_INGREDIENTS_SUCCESS':{
            return {
                ...state, burgerIngregientsFailed: false, burgerIngregients: action.payload, burgerIngregientsRequest: false
            }
        }

        case 'GET_BURGER_INGREDIENTS_FAILED':{
            return {
                ...state, burgerIngregientsFailed: true, burgerIngregientsRequest: false
            }
        }

        case 'GET_INGREDIENTS_REQUEST':{
            return {
                ...state,
                ingregientsRequest: true
            }
        }

        case 'GET_INGREDIENTS_SUCCESS':{
            return {
                ...state, ingregientsFailed: false, ingregients: action.payload, ingregientsRequest: false
            }
        }

        case 'GET_INGREDIENTS_FAILED':{
            return {
                ...state, ingregientsFailed: true, ingregientsRequest: false
            }
        }

        default: {
            return state;
        }


    }
}

export default rootReducer;