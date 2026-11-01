import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoritesState {
  productIds: string[];
}

const initialState: FavoritesState = {
  productIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<FavoritesState | undefined>) {
      if (!action.payload) return;
      state.productIds = action.payload.productIds;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.productIds.indexOf(action.payload);
      if (index >= 0) {
        state.productIds.splice(index, 1);
        return;
      }
      state.productIds.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
  },
});

export const { rehydrate, toggleFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
