import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-lime">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink-100 sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-ink-500">{description}</p>
      ) : null}
    </div>
  );
}
