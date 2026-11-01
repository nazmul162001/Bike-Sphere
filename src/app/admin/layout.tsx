import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { PrototypeBanner } from "@/components/layout/PrototypeBanner";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { adminNav } from "@/lib/constants/navigation";

export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-ink-950 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-ink-700 bg-ink-950 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <div className="flex items-center gap-3 border-b border-ink-700 px-5 py-4">
          <Logo />
          <span className="text-xs uppercase tracking-[0.18em] text-ink-500">Admin desk</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <DashboardNav items={adminNav} />
        </div>
        <div className="border-t border-ink-700 px-5 py-4">
          <Link href="/" className="text-sm text-ink-300 hover:text-lime">
            Back to store
          </Link>
        </div>
      </aside>
      <div className="flex min-h-dvh flex-col">
        <PrototypeBanner />
        <div className="flex items-center justify-between border-b border-ink-700 px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xs uppercase tracking-[0.18em] text-ink-500">Admin desk</span>
          </div>
          <Link href="/" className="text-sm text-ink-300 hover:text-lime">
            Store
          </Link>
        </div>
        <div className="flex-1 px-4 py-8 sm:px-6">
          <div className="mb-6 lg:hidden">
            <DashboardNav items={adminNav} />
          </div>
          <RequireAuth nextPath="/admin" roles={["admin"]}>
            {children}
          </RequireAuth>
        </div>
      </div>
    </div>
  );
}
