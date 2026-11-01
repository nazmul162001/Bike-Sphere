import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      tone: {
        lime: "border-lime/30 bg-lime-dim text-lime",
        muted: "border-ink-700 bg-ink-800 text-ink-300",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        danger: "border-error/30 bg-error/10 text-error",
      },
    },
    defaultVariants: {
      tone: "muted",
    },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ tone, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}
