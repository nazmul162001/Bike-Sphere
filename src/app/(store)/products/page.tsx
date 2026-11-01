import { PhaseRoute } from "@/components/shared/PhaseRoute";
import { MergedProductGrid } from "@/features/catalog/MergedCatalogViews";

export const instant = false;
export const metadata = {
  title: "Parts catalog",
};

export default function ProductsPage() {
  return (
    <PhaseRoute
      eyebrow="Catalog"
      title="Motorcycle parts"
      description="Mock parts plus any products added from the admin desk. No prices are shown until a quotation is written."
    >
      <MergedProductGrid />
    </PhaseRoute>
  );
}
