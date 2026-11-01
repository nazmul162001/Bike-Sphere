import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);
