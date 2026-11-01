import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="BikeSphere home"
    >
      <span className="relative grid size-8 place-items-center rounded-sm border border-lime/40 bg-ink-900">
        <span className="absolute inset-1 rounded-[2px] border border-lime/20" />
        <span className="size-2 rotate-45 bg-lime" />
      </span>
      {compact ? null : (
        <span className="font-display text-lg font-semibold tracking-tight text-ink-100">
          Bike<span className="text-lime">Sphere</span>
        </span>
      )}
    </Link>
  );
}
