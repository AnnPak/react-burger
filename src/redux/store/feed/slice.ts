import { wsActionType } from '../../middleware/socket-middleware';
import { createSlice } from "@reduxjs/toolkit";
export type OrdersInitState = {
  orders: any;
  total?: any;
  totalToday?: any;
  userOrders:any;
}

export const initialState:OrdersInitState = {
  orders: null,
  total: null,
  totalToday: null,
  userOrders: null,
}

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsMessage: (state, action) => {
      const { success, orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;

    },
    
  },
});

const { actions, reducer } = feedSlice;
export const {wsMessage} = actions
export default reducer;