import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PrototypeBanner } from "@/components/layout/PrototypeBanner";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <PrototypeBanner />
      <Header />
      <MobileNav />
      <SearchOverlay />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
