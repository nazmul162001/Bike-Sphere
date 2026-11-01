"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { loadPersistedState, persistState } from "@/store/persist";
import { rehydrate as rehydrateAddresses } from "@/store/slices/addressSlice";
import { rehydrate as rehydrateAuth } from "@/store/slices/authSlice";
import { rehydrate as rehydrateBikes } from "@/store/slices/bikeSlice";
import { rehydrate as rehydrateCatalog } from "@/store/slices/catalogSlice";
import { rehydrate as rehydrateCart } from "@/store/slices/cartSlice";
import { rehydrate as rehydrateComparison } from "@/store/slices/comparisonSlice";
import { rehydrate as rehydrateFavorites } from "@/store/slices/favoritesSlice";
import { rehydrate as rehydrateListings } from "@/store/slices/listingSlice";
import { rehydrate as rehydrateOrders } from "@/store/slices/orderSlice";
import { rehydrate as rehydrateProducts } from "@/store/slices/productSlice";
import { rehydrate as rehydrateQuotations } from "@/store/slices/quotationSlice";
import { setHydrated } from "@/store/slices/uiSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      const persisted = loadPersistedState();
      if (persisted) {
        store.dispatch(rehydrateAuth(persisted.auth));
        store.dispatch(rehydrateAddresses(persisted.addresses));
        store.dispatch(rehydrateCart(persisted.cart));
        store.dispatch(rehydrateFavorites(persisted.favorites));
        store.dispatch(rehydrateBikes(persisted.bikes));
        store.dispatch(rehydrateCatalog(persisted.catalog));
        store.dispatch(rehydrateComparison(persisted.comparison));
        store.dispatch(rehydrateQuotations(persisted.quotations));
        store.dispatch(rehydrateOrders(persisted.orders));
        store.dispatch(rehydrateListings(persisted.listings));
        store.dispatch(rehydrateProducts(persisted.products));
      }
      store.dispatch(setHydrated(true));
    }

    persistState(store.getState());
    return store.subscribe(() => {
      persistState(store.getState());
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
