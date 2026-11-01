import type { RootState } from "@/store";

export const selectHasHydrated = (state: RootState) => state.ui.hasHydrated;
export const selectToasts = (state: RootState) => state.ui.toasts;
export const selectMobileNavOpen = (state: RootState) => state.ui.mobileNavOpen;
export const selectSearchOpen = (state: RootState) => state.ui.searchOpen;
