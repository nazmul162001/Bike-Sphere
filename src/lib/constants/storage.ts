export const STORAGE_KEY = "bikesphere.v1";

export const persistedSliceKeys = [
  "auth",
  "cart",
  "favorites",
  "bikes",
  "catalog",
  "comparison",
  "quotations",
  "orders",
  "listings",
  "products",
] as const;

export type PersistedSliceKey = (typeof persistedSliceKeys)[number];
