import { cn } from "@/lib/utils/cn";

const glyphs: Record<string, string> = {
  "cat-clutch": "M12 5v14M5 12h14M8 8l8 8M16 8l-8 8",
  "cat-brake": "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 4v8",
  "cat-filters": "M4 6h16M7 12h10M10 18h4",
  "cat-chain": "M6 12h12M8 9v6M16 9v6",
  "cat-electrical": "M13 3 6 14h6l-1 7 7-11h-6z",
  "cat-lighting": "M9 18h6M12 3v3M7 8l8 8M5 12h3M16 12h3",
  "cat-engine": "M4 10h16v6H4zM8 7h8v3H8z",
  "cat-suspension": "M8 4v16M16 4v16M8 8h8M8 16h8",
  "cat-mirrors": "M5 7h6v10H5zM13 9h6v8h-6z",
  "cat-controls": "M4 12h16M7 8v8M17 8v8",
};

export function ProductVisual({
  categoryId,
  accent,
  className,
}: {
  categoryId: string;
  accent: string;
  className?: string;
}) {
  const path = glyphs[categoryId] ?? "M6 6h12v12H6z";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink-900",
        className,
      )}
    >
      <div className="bg-tech-grid absolute inset-0 opacity-70" />
      <div
        className="absolute -right-8 -bottom-10 size-32 rotate-12 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.18 }}
      />
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 m-auto size-16 stroke-[1.4]"
        fill="none"
        stroke={accent}
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </div>
  );
}
