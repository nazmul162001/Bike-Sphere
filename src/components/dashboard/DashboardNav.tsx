"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

function isActive(href: string, pathname: string) {
  if (href === "/admin" || href === "/account") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Section">
      {items.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-sm border-l-2 px-3 py-2 text-sm transition-colors",
              active
                ? "border-lime bg-lime-dim font-medium text-lime"
                : "border-transparent text-ink-300 hover:bg-ink-850 hover:text-ink-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
