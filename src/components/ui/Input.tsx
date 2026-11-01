import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-ink-100">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-sm border border-ink-700 bg-ink-900 px-3 text-sm text-ink-100 placeholder:text-ink-500 transition-colors focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime",
          error && "border-error focus:border-error focus:ring-error",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-error">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-ink-500">{hint}</p> : null}
    </div>
  );
}
