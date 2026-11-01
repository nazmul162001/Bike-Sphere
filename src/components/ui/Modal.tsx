"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { overlayFade, scaleIn } from "@/lib/motion/variants";

export function Modal({
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
        <div className="fixed inset-0 z-50 grid place-items-center px-4">
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-ink-950/75"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayFade}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-lg rounded-md border border-ink-700 bg-ink-900 p-5 shadow-[var(--shadow-panel)]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id="modal-title" className="font-display text-xl text-ink-100">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 place-items-center rounded-sm text-ink-300 hover:bg-ink-850"
                aria-label="Close dialog"
              >
                <X className="size-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
