import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "@/store/slices/addressSlice";
import { authReducer } from "@/store/slices/authSlice";
import { bikeReducer } from "@/store/slices/bikeSlice";
import { catalogReducer } from "@/store/slices/catalogSlice";
import { cartReducer } from "@/store/slices/cartSlice";
import { comparisonReducer } from "@/store/slices/comparisonSlice";
import { favoritesReducer } from "@/store/slices/favoritesSlice";
import { filterReducer } from "@/store/slices/filterSlice";
import { listingReducer } from "@/store/slices/listingSlice";
import { notificationReducer } from "@/store/slices/notificationSlice";
import { orderReducer } from "@/store/slices/orderSlice";
import { productReducer } from "@/store/slices/productSlice";
import { quotationReducer } from "@/store/slices/quotationSlice";
import { uiReducer } from "@/store/slices/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  addresses: addressReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  bikes: bikeReducer,
  catalog: catalogReducer,
  products: productReducer,
  filters: filterReducer,
  quotations: quotationReducer,
  orders: orderReducer,
  notifications: notificationReducer,
  comparison: comparisonReducer,
  listings: listingReducer,
  ui: uiReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
