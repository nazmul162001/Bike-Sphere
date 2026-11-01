"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { primaryNav } from "@/lib/constants/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileNavOpen } from "@/store/slices/uiSlice";
import { selectMobileNavOpen } from "@/store/selectors/ui";
import { signOut } from "@/store/slices/authSlice";

export function MobileNav() {
  const open = useAppSelector(selectMobileNavOpen);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function close() {
    dispatch(setMobileNavOpen(false));
  }

  return (
    <Drawer open={open} title="Navigate" onClose={close}>
      <nav className="flex flex-col gap-1" aria-label="Mobile">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="rounded-sm px-3 py-3 hover:bg-ink-850"
          >
            <span className="block text-sm font-medium text-ink-100">{item.label}</span>
            {item.description ? (
              <span className="mt-1 block text-xs text-ink-500">{item.description}</span>
            ) : null}
          </Link>
        ))}
        {user ? (
          <>
            <Link href="/account" onClick={close} className="mt-4 rounded-sm border border-ink-700 px-3 py-3 text-sm">
              Account · {user.role}
            </Link>
            {user.role === "admin" ? (
              <Link href="/admin" onClick={close} className="rounded-sm px-3 py-3 text-sm text-ink-300">
                Admin desk
              </Link>
            ) : null}
            <button
              type="button"
              className="rounded-sm px-3 py-3 text-left text-sm text-ink-300"
              onClick={() => {
                dispatch(signOut());
                close();
                router.push("/");
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login" onClick={close} className="mt-4 rounded-sm border border-ink-700 px-3 py-3 text-sm">
            Sign in
          </Link>
        )}
      </nav>
    </Drawer>
  );
}
