import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Seller orders",
};

export default function SellerOrdersPage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="Seller orders"
      description="Accepted quotation follow-through for sellers is part of Phase 6."
    />
  );
}
