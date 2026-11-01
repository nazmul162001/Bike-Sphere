"use client";

import { MotionConfig } from "framer-motion";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { StoreProvider } from "@/store/provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <MotionConfig reducedMotion="user">
        {children}
        <ToastViewport />
      </MotionConfig>
    </StoreProvider>
  );
}
