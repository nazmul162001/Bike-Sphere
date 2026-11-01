"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { loginHref } from "@/lib/utils/routes";
import { useAppSelector } from "@/store/hooks";
import { selectHasHydrated } from "@/store/selectors/ui";
import type { UserRole } from "@/types";

export function RequireAuth({
  children,
  roles,
  nextPath,
}: {
  children: React.ReactNode;
  roles?: UserRole[];
  nextPath: string;
}) {
  const hydrated = useAppSelector(selectHasHydrated);
  const user = useAppSelector((state) => state.auth.user);

  if (!hydrated) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!user) {
    return (
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Sign in required</p>
        <h2 className="mt-3 font-display text-2xl text-ink-100">This desk needs an account.</h2>
        <p className="mt-2 text-sm text-ink-500">
          Use the prototype accounts on the sign-in page. Signup is a demo form and does not create a
          login.
        </p>
        <div className="mt-5">
          <Button href={loginHref(nextPath)}>Sign in</Button>
        </div>
      </Card>
    );
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-warning">Restricted</p>
        <h2 className="mt-3 font-display text-2xl text-ink-100">This desk is role-gated.</h2>
        <p className="mt-2 text-sm text-ink-500">
          Signed in as {user.email} with the {user.role} role. Admin tools require admin@gmail.com.
        </p>
        <div className="mt-5 flex gap-3">
          <Button href="/account">Go to account</Button>
          <Button href="/" variant="secondary">
            Store
          </Button>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
