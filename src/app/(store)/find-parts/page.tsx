import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Find parts for your bike",
};

export default function FindPartsPage() {
  return (
    <PhaseRoute
      eyebrow="Bike finder"
      title="Select the motorcycle first"
      description="The interactive four-step finder — brand, model, year, and variant — is scheduled for Phase 2. The homepage already uses the same selection language: Brand, Model, Year, then Variant."
    />
  );
}
