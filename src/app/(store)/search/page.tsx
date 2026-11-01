import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PhaseRoute } from "@/components/shared/PhaseRoute";
import { catalogService } from "@/services/adapters/catalog";

export const metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const results = query ? catalogService.searchProducts(query) : [];
  const categories = catalogService.listCategories();
  const models = catalogService.listModels();

  return (
    <PhaseRoute
      eyebrow="Search"
      title={query ? `Results for “${query}”` : "Search the catalog"}
      description="This prototype search matches product names, SKUs, part numbers, manufacturers, and tags in mock data. Autocomplete and recent searches arrive in Phase 2."
    >
      {query && results.length === 0 ? (
        <EmptyState
          title="No matching parts"
          description="Try a brand, SKU, or part name such as R15 clutch, Pulsar chain, or CBR pads."
        />
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(query ? results : catalogService.listProducts().slice(0, 8)).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            category={categories.find((category) => category.id === product.categoryId)}
            models={models}
          />
        ))}
      </div>
    </PhaseRoute>
  );
}
