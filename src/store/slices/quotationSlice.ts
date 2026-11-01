import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Quotation, QuotationRequest } from "@/types";

export interface QuotationState {
  requests: QuotationRequest[];
  quotations: Quotation[];
}

const initialState: QuotationState = {
  requests: [],
  quotations: [],
};

const quotationSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<QuotationState | undefined>) {
      if (!action.payload) return;
      state.requests = action.payload.requests;
      state.quotations = action.payload.quotations;
    },
    addRequest(state, action: PayloadAction<QuotationRequest>) {
      state.requests.unshift(action.payload);
    },
    addQuotation(state, action: PayloadAction<Quotation>) {
      state.quotations.unshift(action.payload);
    },
    updateRequest(state, action: PayloadAction<QuotationRequest>) {
      const index = state.requests.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state.requests[index] = action.payload;
    },
    updateQuotation(state, action: PayloadAction<Quotation>) {
      const index = state.quotations.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state.quotations[index] = action.payload;
    },
  },
});

export const { rehydrate, addRequest, addQuotation, updateRequest, updateQuotation } =
  quotationSlice.actions;
export const quotationReducer = quotationSlice.reducer;
