import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<CartState | undefined>) {
      if (!action.payload) return;
      state.items = action.payload.items;
    },
    addItem(
      state,
      action: PayloadAction<{
        productId: string;
        quantity?: number;
        selectedModelId?: string;
      }>,
    ) {
      const { productId, quantity = 1, selectedModelId } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.productId === productId &&
          item.selectedModelId === selectedModelId,
      );

      if (existing) {
        existing.quantity += quantity;
        return;
      }

      state.items.push({
        productId,
        quantity,
        selectedModelId,
        addedAt: new Date().toISOString(),
      });
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number; selectedModelId?: string }>,
    ) {
      const item = state.items.find(
        (entry) =>
          entry.productId === action.payload.productId &&
          entry.selectedModelId === action.payload.selectedModelId,
      );
      if (!item) return;
      item.quantity = Math.max(1, action.payload.quantity);
    },
    removeItem(
      state,
      action: PayloadAction<{ productId: string; selectedModelId?: string }>,
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.selectedModelId === action.payload.selectedModelId
          ),
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { rehydrate, addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
