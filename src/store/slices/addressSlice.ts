import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { SavedAddress } from "@/types";

export interface AddressState {
  addresses: SavedAddress[];
}

const initialState: AddressState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<AddressState | undefined>) {
      if (!action.payload) return;
      state.addresses = action.payload.addresses;
    },
    addAddress: {
      reducer(state, action: PayloadAction<SavedAddress>) {
        if (action.payload.isDefault) {
          state.addresses.forEach((address) => {
            address.isDefault = false;
          });
        }
        state.addresses.push(action.payload);
      },
      prepare(draft: Omit<SavedAddress, "id">) {
        return { payload: { ...draft, id: nanoid() } };
      },
    },
    removeAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter((address) => address.id !== action.payload);
    },
    setDefaultAddress(state, action: PayloadAction<string>) {
      state.addresses.forEach((address) => {
        address.isDefault = address.id === action.payload;
      });
    },
  },
});

export const { rehydrate, addAddress, removeAddress, setDefaultAddress } =
  addressSlice.actions;
export const addressReducer = addressSlice.reducer;
