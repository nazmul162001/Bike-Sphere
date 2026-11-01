import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AvailabilityStatus, PartClassification, PartCondition } from "@/types";

export interface FilterState {
  query: string;
  categoryIds: string[];
  brandIds: string[];
  modelIds: string[];
  years: number[];
  classifications: PartClassification[];
  conditions: PartCondition[];
  availability: AvailabilityStatus[];
  manufacturers: string[];
}

const initialState: FilterState = {
  query: "",
  categoryIds: [],
  brandIds: [],
  modelIds: [],
  years: [],
  classifications: [],
  conditions: [],
  availability: [],
  manufacturers: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      Object.assign(state, action.payload);
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const { setQuery, setFilters, clearFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
