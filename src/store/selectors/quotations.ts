import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const selectQuotationRequests = (state: RootState) => state.quotations.requests;
export const selectQuotations = (state: RootState) => state.quotations.quotations;
export const selectOrders = (state: RootState) => state.orders.orders;

export const selectRequestsByEmail = (email?: string) =>
  createSelector(selectQuotationRequests, (requests) =>
    email ? requests.filter((request) => request.email === email) : requests,
  );
