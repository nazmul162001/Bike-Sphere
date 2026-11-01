import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Seller listings",
};

export default function SellerListingsPage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="Listings"
      description="Create, edit, and manage mock listings in Phase 6. The Redux listings slice is already prepared."
    />
  );
}
