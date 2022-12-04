import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type OrdersInitState = {
  success: boolean | null;
  orders: Array<TOrder> | null;
  total?: number | null;
  totalToday?: number | null;
  userOrders:any;
}

export const initialState:OrdersInitState = {
  success: null,
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
      state.success = success;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    wsUserMessage: (state, action) => {
      const { success, orders, total, totalToday } = action.payload;
      state.success = success;
      state.userOrders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    wsClose: (state) => {
      state.success = false;
    },
  },
});

const { actions, reducer } = feedSlice;
export const {wsMessage, wsUserMessage} = actions
export default reducer;