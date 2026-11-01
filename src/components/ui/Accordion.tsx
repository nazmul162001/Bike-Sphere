"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { accordionContent } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

export function Accordion({
  items,
}: {
  items: { id: string; title: string; content: string }[];
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-ink-700 border-y border-ink-700">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="font-display text-lg text-ink-100">{item.title}</span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-lime transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={accordionContent}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-7 text-ink-500">{item.content}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
