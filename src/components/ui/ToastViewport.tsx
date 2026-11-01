"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { fadeUp } from "@/lib/motion/variants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dismissToast } from "@/store/slices/uiSlice";
import { selectToasts } from "@/store/selectors/ui";
import { cn } from "@/lib/utils/cn";

export function ToastViewport() {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dispatch(dismissToast(toast.id)), 4200),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [toasts, dispatch]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex w-[min(100%-2rem,360px)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeUp}
            className={cn(
              "pointer-events-auto rounded-md border bg-ink-850 px-4 py-3 shadow-[var(--shadow-panel)]",
              toast.tone === "success" && "border-success/40",
              toast.tone === "warning" && "border-warning/40",
              toast.tone === "error" && "border-error/40",
              toast.tone === "info" && "border-ink-700",
            )}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-ink-100">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-xs leading-5 text-ink-500">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dispatch(dismissToast(toast.id))}
                className="grid size-7 place-items-center rounded-sm text-ink-500 hover:bg-ink-800 hover:text-ink-100"
                aria-label="Dismiss notification"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
