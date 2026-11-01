import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type ToastTone = "info" | "success" | "warning" | "error";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

export interface UiState {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  toasts: ToastMessage[];
  hasHydrated: boolean;
}

const initialState: UiState = {
  mobileNavOpen: false,
  searchOpen: false,
  toasts: [],
  hasHydrated: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHydrated(state, action: PayloadAction<boolean>) {
      state.hasHydrated = action.payload;
    },
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.searchOpen = action.payload;
    },
    pushToast: {
      reducer(state, action: PayloadAction<ToastMessage>) {
        state.toasts.push(action.payload);
      },
      prepare(input: Omit<ToastMessage, "id">) {
        return { payload: { ...input, id: nanoid() } };
      },
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const {
  setHydrated,
  setMobileNavOpen,
  setSearchOpen,
  pushToast,
  dismissToast,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
