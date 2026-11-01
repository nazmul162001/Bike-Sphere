import { CatalogTable } from "@/features/admin/AdminCollections";
import { catalogService } from "@/services/adapters/catalog";

export const metadata = { title: "Reviews" };

export default function Page() {
  return (
    <CatalogTable
      title="Reviews"
      rows={catalogService.listReviews().map((review) => ({
        id: review.id,
        primary: review.title,
        secondary: `${review.author} · ${review.city}`,
      }))}
    />
  );
}
