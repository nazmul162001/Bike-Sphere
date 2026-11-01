import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Seller dashboard",
};

export default function SellerDashboardPage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="Seller dashboard"
      description="Listing management, orders, and seller profile screens are reserved for Phase 6."
    />
  );
}
