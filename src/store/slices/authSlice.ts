import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PrototypeUser } from "@/types";

export interface AuthState {
  user: PrototypeUser | null;
  isAuthenticated: boolean;
  status: "guest" | "authenticated";
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "guest",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<AuthState | undefined>) {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.status = action.payload.status;
    },
    signIn(state, action: PayloadAction<PrototypeUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "authenticated";
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "guest";
    },
    updateProfile(state, action: PayloadAction<Partial<PrototypeUser>>) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { rehydrate, signIn, signOut, updateProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;
