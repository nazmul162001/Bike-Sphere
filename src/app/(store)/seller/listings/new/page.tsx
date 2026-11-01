import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "New listing",
};

export default function NewListingPage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="New listing"
      description="The listing form — category, compatibility, condition, and contact preference — is scheduled for Phase 6."
    />
  );
}
