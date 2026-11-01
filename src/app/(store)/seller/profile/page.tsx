import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Seller profile",
};

export default function SellerProfilePage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="Seller profile"
      description="Public seller profile cards and contact preferences arrive with the marketplace phase."
    />
  );
}
