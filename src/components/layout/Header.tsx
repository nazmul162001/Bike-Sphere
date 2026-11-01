"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/lib/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/selectors/cart";
import { selectHasHydrated } from "@/store/selectors/ui";
import { setMobileNavOpen, setSearchOpen } from "@/store/slices/uiSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const hydrated = useAppSelector(selectHasHydrated);
  const favoriteCount = useAppSelector((state) => state.favorites.productIds.length);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/92 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850 lg:hidden"
            onClick={() => dispatch(setMobileNavOpen(true))}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-ink-850 hover:text-ink-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => dispatch(setSearchOpen(true))}
            className="grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850"
            aria-label="Search parts"
          >
            <Search className="size-4" />
          </button>
          <Link
            href="/account/favorites"
            className="relative grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850"
            aria-label="Favorites"
          >
            <Heart className="size-4" />
            {hydrated && favoriteCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-lime" />
            ) : null}
          </Link>
          <Link
            href="/cart"
            className="relative grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850"
            aria-label="Request list"
          >
            <ShoppingBag className="size-4" />
            {hydrated && cartCount > 0 ? (
              <span className="absolute top-1 right-1 min-w-4 rounded-full bg-lime px-1 text-[10px] font-semibold text-ink-950">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
