export const getIngredientsRequest = () => {
    return {
        type: 'GET_INGREDIENTS_REQUEST'
    }
}

export const getIngredientsSuccess = (ingredient) => {
    return {
        type: 'GET_INGREDIENTS_SUCCESS',
        payload: ingredient
    }
}

export const getIngredientsFailed = () => {
    return {
        type: 'GET_INGREDIENTS_FAILED'
    }
}

export const getBurderIngredientsRequest = () => {
    return {
        type: 'GET_BURGER_INGREDIENTS_REQUEST'
    }
}

export const getBurderIngredientsSuccess = (ingredient) => {
    return {
        type: 'GET_BURGER_INGREDIENTS_SUCCESS',
        payload: ingredient
    }
}

export const getBurderIngredientsFailed = () => {
    return {
        type: 'GET_BURGER_INGREDIENTS_FAILED'
    }
}

export const getOrderRequest = () => {
    return {
        type: 'GET_ORDER_REQUEST'
    }
}

export const getOrderSuccess = (order) => {
    return {
        type: 'GET_ORDER_SUCCESS',
        payload: order
    }
}

export const getOrderFailed = () => {
    return {
        type: 'GET_ORDER_FAILED'
    }
}

export const addIngredientToModal = (ingredient) => {
    return {
        type: 'ADD_MODAL_INGREDIENT',
        payload: ingredient

    }
}

export const addOrderToModal = (order) => {
    return {
        type: 'ADD_MODAL_ORDER',
        payload: order

    }
}

export const removeModal = () => {
    return {
        type: 'REMOVE_MODAL',
    }
}

