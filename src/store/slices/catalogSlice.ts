import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, Product } from "@/types";

export interface CatalogState {
  extraCategories: Category[];
  extraProducts: Product[];
}

const initialState: CatalogState = {
  extraCategories: [],
  extraProducts: [],
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<CatalogState | undefined>) {
      if (!action.payload) return;
      state.extraCategories = action.payload.extraCategories ?? [];
      state.extraProducts = action.payload.extraProducts ?? [];
    },
    addCategory: {
      reducer(state, action: PayloadAction<Category>) {
        state.extraCategories.unshift(action.payload);
      },
      prepare(draft: Omit<Category, "id" | "slug"> & { slug?: string }) {
        const slug = draft.slug || draft.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        return {
          payload: {
            id: `cat-${nanoid(6)}`,
            slug,
            name: draft.name,
            description: draft.description,
            accent: draft.accent,
          } satisfies Category,
        };
      },
    },
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.extraProducts.unshift(action.payload);
      },
      prepare(draft: Omit<Product, "id" | "slug" | "image" | "gallery"> & { slug?: string }) {
        const slug = draft.slug || draft.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        return {
          payload: {
            ...draft,
            id: `prod-${nanoid(6)}`,
            slug,
            image: { src: "/images/products/generic.svg", alt: draft.name },
            gallery: [],
          } satisfies Product,
        };
      },
    },
  },
});

export const { rehydrate, addCategory, addProduct } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
