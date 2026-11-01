import { SellerPromo } from "@/components/home/SellerPromo";
import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Sell on BikeSphere",
};

export default function SellPage() {
  return (
    <PhaseRoute
      eyebrow="Marketplace"
      title="Sell parts through the desk"
      description="Seller registration, listings, and dashboards are Phase 6. This route is wired so homepage and footer links stay intact."
    >
      <SellerPromo />
    </PhaseRoute>
  );
}
