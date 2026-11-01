import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProductViewState {
  recentlyViewedIds: string[];
}

const initialState: ProductViewState = {
  recentlyViewedIds: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<ProductViewState | undefined>) {
      if (!action.payload) return;
      state.recentlyViewedIds = action.payload.recentlyViewedIds;
    },
    rememberViewed(state, action: PayloadAction<string>) {
      state.recentlyViewedIds = [
        action.payload,
        ...state.recentlyViewedIds.filter((id) => id !== action.payload),
      ].slice(0, 12);
    },
  },
});

export const { rehydrate, rememberViewed } = productSlice.actions;
export const productReducer = productSlice.reducer;
