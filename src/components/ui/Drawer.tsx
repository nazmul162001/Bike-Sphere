"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { drawerSlide, overlayFade } from "@/lib/motion/variants";

export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink-950/70"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayFade}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute inset-y-0 right-0 flex w-[min(100%,400px)] flex-col border-l border-ink-700 bg-ink-900"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerSlide}
          >
            <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
              <h2 className="font-display text-lg text-ink-100">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-sm text-ink-300 hover:bg-ink-850 hover:text-ink-100"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
