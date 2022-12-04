import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type OrdersInitState = {
  orders: Array<TOrder> | null;
  total?: number | null;
  totalToday?: number | null;
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
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;

    },
  },
});

const { actions, reducer } = feedSlice;
export const {wsMessage} = actions
export default reducer;