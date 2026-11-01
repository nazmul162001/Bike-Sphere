import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PrototypeBanner } from "@/components/layout/PrototypeBanner";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { accountNav } from "@/lib/constants/navigation";

export const instant = false;

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden">
      <PrototypeBanner />
      <Header />
      <MobileNav />
      <SearchOverlay />
      <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-ink-700 bg-ink-950 lg:flex lg:h-full lg:flex-col">
          <p className="px-5 pt-8 pb-3 text-xs uppercase tracking-[0.18em] text-ink-500">
            Account
          </p>
          <div className="flex-1 overflow-y-auto px-3 pb-8">
            <DashboardNav items={accountNav} />
          </div>
        </aside>
        <div className="flex min-h-0 flex-col lg:overflow-y-auto">
          <div className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 lg:hidden">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ink-500">Account</p>
              <DashboardNav items={accountNav} />
            </div>
            <RequireAuth nextPath="/account">{children}</RequireAuth>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
