import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-ink-100">
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
        className={cn(
          "min-h-28 w-full rounded-sm border border-ink-700 bg-ink-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime",
          error && "border-error focus:border-error focus:ring-error",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
