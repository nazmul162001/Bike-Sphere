import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-md border border-dashed border-ink-700 bg-ink-900 px-6 py-10",
        className,
      )}
    >
      <Inbox className="size-5 text-lime" aria-hidden="true" />
      <h3 className="font-display text-xl text-ink-100">{title}</h3>
      <p className="max-w-lg text-sm leading-6 text-ink-500">{description}</p>
      {action}
    </div>
  );
}
