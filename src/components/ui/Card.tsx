import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-ink-700 bg-ink-850 shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
