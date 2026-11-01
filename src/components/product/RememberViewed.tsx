"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { rememberViewed } from "@/store/slices/productSlice";

export function RememberViewed({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(rememberViewed(productId));
  }, [dispatch, productId]);
  return null;
}
