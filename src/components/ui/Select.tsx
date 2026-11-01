import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-ink-100">
          {label}
        </label>
      ) : null}
      <select
        id={fieldId}
        className={cn(
          "h-11 w-full cursor-pointer rounded-sm border border-ink-700 bg-ink-900 px-3 text-sm text-ink-100 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime",
          error && "border-error",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
