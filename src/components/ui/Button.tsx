import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { Route } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-lime text-ink-950 hover:bg-lime-hover",
        secondary:
          "border border-ink-700 bg-ink-850 text-ink-100 hover:border-ink-500 hover:bg-ink-800",
        ghost: "text-ink-100 hover:bg-ink-850",
        limeOutline:
          "border border-lime/40 bg-lime-dim text-lime hover:border-lime hover:bg-lime hover:text-ink-950",
        danger: "bg-error text-ink-100 hover:bg-error/90",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  href?: Route;
} & (
    | ({ href: Route } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
  );

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const linkProps = props as Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
