import type { RootState } from "@/store";

export const selectFavoriteIds = (state: RootState) => state.favorites.productIds;

export const selectIsFavorite = (productId: string) => (state: RootState) =>
  state.favorites.productIds.includes(productId);
