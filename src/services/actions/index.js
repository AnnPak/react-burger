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

