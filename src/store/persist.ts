import { STORAGE_KEY } from "@/lib/constants/storage";
import type { RootState } from "@/store";
import type { AddressState } from "@/store/slices/addressSlice";
import type { AuthState } from "@/store/slices/authSlice";
import type { BikeState } from "@/store/slices/bikeSlice";
import type { CatalogState } from "@/store/slices/catalogSlice";
import type { CartState } from "@/store/slices/cartSlice";
import type { ComparisonState } from "@/store/slices/comparisonSlice";
import type { FavoritesState } from "@/store/slices/favoritesSlice";
import type { ListingState } from "@/store/slices/listingSlice";
import type { OrderState } from "@/store/slices/orderSlice";
import type { ProductViewState } from "@/store/slices/productSlice";
import type { QuotationState } from "@/store/slices/quotationSlice";

export interface PersistedState {
  auth: AuthState;
  addresses?: AddressState;
  cart: CartState;
  favorites: FavoritesState;
  bikes: BikeState;
  catalog?: CatalogState;
  comparison: ComparisonState;
  quotations: QuotationState;
  orders: OrderState;
  listings: ListingState;
  products: ProductViewState;
}

export function loadPersistedState(): PersistedState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function persistState(state: RootState) {
  if (typeof window === "undefined") return;

  const payload: PersistedState = {
    auth: state.auth,
    addresses: state.addresses,
    cart: state.cart,
    favorites: state.favorites,
    bikes: state.bikes,
    catalog: state.catalog,
    comparison: state.comparison,
    quotations: state.quotations,
    orders: state.orders,
    listings: state.listings,
    products: state.products,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be unavailable in private mode. Prototype continues in-memory.
  }
}
