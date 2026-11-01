import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ComparisonState {
  productIds: string[];
}

const initialState: ComparisonState = {
  productIds: [],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<ComparisonState | undefined>) {
      if (!action.payload) return;
      state.productIds = action.payload.productIds;
    },
    toggleComparison(state, action: PayloadAction<string>) {
      const index = state.productIds.indexOf(action.payload);
      if (index >= 0) {
        state.productIds.splice(index, 1);
        return;
      }
      if (state.productIds.length >= 4) return;
      state.productIds.push(action.payload);
    },
    clearComparison(state) {
      state.productIds = [];
    },
  },
});

export const { rehydrate, toggleComparison, clearComparison } = comparisonSlice.actions;
export const comparisonReducer = comparisonSlice.reducer;
