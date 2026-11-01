import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SellerListing } from "@/types";

export interface ListingState {
  listings: SellerListing[];
}

const initialState: ListingState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<ListingState | undefined>) {
      if (!action.payload) return;
      state.listings = action.payload.listings;
    },
    addListing(state, action: PayloadAction<SellerListing>) {
      state.listings.unshift(action.payload);
    },
    updateListing(state, action: PayloadAction<SellerListing>) {
      const index = state.listings.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state.listings[index] = action.payload;
    },
    removeListing(state, action: PayloadAction<string>) {
      state.listings = state.listings.filter((item) => item.id !== action.payload);
    },
  },
});

export const { rehydrate, addListing, updateListing, removeListing } =
  listingSlice.actions;
export const listingReducer = listingSlice.reducer;
