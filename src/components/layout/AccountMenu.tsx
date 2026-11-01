"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signOut } from "@/store/slices/authSlice";

export function AccountMenu() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850"
        aria-label="Account"
      >
        <UserRound className="size-4" />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-sm text-ink-100 hover:bg-ink-850"
        aria-expanded={open}
        aria-label="Account menu"
      >
        <UserRound className="size-4" />
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-56 rounded-md border border-ink-700 bg-ink-900 p-2 shadow-[var(--shadow-panel)]">
          <p className="px-2 py-1 text-xs text-ink-500">{user.email}</p>
          <p className="px-2 pb-2 text-xs uppercase tracking-[0.14em] text-lime">{user.role}</p>
          <Link href="/account" className="block rounded-sm px-2 py-2 text-sm hover:bg-ink-850" onClick={() => setOpen(false)}>
            Account
          </Link>
          {user.role === "admin" ? (
            <Link href="/admin" className="block rounded-sm px-2 py-2 text-sm hover:bg-ink-850" onClick={() => setOpen(false)}>
              Admin desk
            </Link>
          ) : null}
          <button
            type="button"
            className="block w-full rounded-sm px-2 py-2 text-left text-sm hover:bg-ink-850"
            onClick={() => {
              dispatch(signOut());
              setOpen(false);
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
