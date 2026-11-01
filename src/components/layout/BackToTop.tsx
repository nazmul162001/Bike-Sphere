"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 left-4 z-40 grid size-11 place-items-center rounded-sm border border-ink-700 bg-ink-850 text-ink-100 shadow-[var(--shadow-panel)] hover:border-lime hover:text-lime"
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
