import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { SavedBike } from "@/types";

export interface BikeState {
  bikes: SavedBike[];
}

const initialState: BikeState = {
  bikes: [],
};

type BikeDraft = Omit<SavedBike, "id" | "isPrimary"> & { isPrimary?: boolean };

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<BikeState | undefined>) {
      if (!action.payload) return;
      state.bikes = action.payload.bikes;
    },
    addBike: {
      reducer(state, action: PayloadAction<SavedBike>) {
        const shouldBePrimary = action.payload.isPrimary || state.bikes.length === 0;
        if (shouldBePrimary) {
          state.bikes.forEach((bike) => {
            bike.isPrimary = false;
          });
        }
        state.bikes.push({ ...action.payload, isPrimary: shouldBePrimary });
      },
      prepare(draft: BikeDraft) {
        return {
          payload: {
            ...draft,
            id: nanoid(),
            isPrimary: draft.isPrimary ?? false,
          },
        };
      },
    },
    updateBike(state, action: PayloadAction<SavedBike>) {
      const index = state.bikes.findIndex((bike) => bike.id === action.payload.id);
      if (index === -1) return;
      if (action.payload.isPrimary) {
        state.bikes.forEach((bike) => {
          bike.isPrimary = false;
        });
      }
      state.bikes[index] = action.payload;
    },
    removeBike(state, action: PayloadAction<string>) {
      state.bikes = state.bikes.filter((bike) => bike.id !== action.payload);
    },
    setPrimaryBike(state, action: PayloadAction<string>) {
      state.bikes.forEach((bike) => {
        bike.isPrimary = bike.id === action.payload;
      });
    },
  },
});

export const { rehydrate, addBike, updateBike, removeBike, setPrimaryBike } =
  bikeSlice.actions;
export const bikeReducer = bikeSlice.reducer;
