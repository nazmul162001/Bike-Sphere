import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-ink-800", className)}
      aria-hidden="true"
    />
  );
}
