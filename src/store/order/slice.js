import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orderNumber: null,
    orderIngredients: null,
    orderStatus: 'idle',
}


const ingredientsSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrderRequest: state => { state.orderStatus = 'loading'; },
        getOrderSuccess: (state, action) => {
            state.orderNumber = action.payload;
            state.orderStatus = 'success';
            state.constructorIngredients = null;
            state.bun = null;
        },
        getOrderFailed: state => { state.orderStatus = 'error' },
        setOrderIngredients: (state, action) => { 
            state.orderIngredients = action.payload; 
        },
    }

})

const { actions, reducer } = ingredientsSlice;

export default reducer;
export const {
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    setOrderIngredients,
} = actions