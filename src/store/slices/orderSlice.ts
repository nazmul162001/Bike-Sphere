import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<OrderState | undefined>) {
      if (!action.payload) return;
      state.orders = action.payload.orders;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex((order) => order.id === action.payload.id);
      if (index >= 0) state.orders[index] = action.payload;
    },
  },
});

export const { rehydrate, addOrder, updateOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
