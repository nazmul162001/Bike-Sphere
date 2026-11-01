import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { catalogService } from "@/services/adapters/catalog";

export async function generateStaticParams() {
  return catalogService.listBrands().map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = catalogService.getBrandBySlug(slug);
  return { title: brand?.name ?? "Brand" };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = catalogService.getBrandBySlug(slug);
  if (!brand) notFound();

  const models = catalogService.listModelsByBrand(brand.id);
  const modelIds = new Set(models.map((model) => model.id));
  const products = catalogService
    .listProducts()
    .filter((product) => product.compatibleModelIds.some((id) => modelIds.has(id)));
  const categories = catalogService.listCategories();

  return (
    <Container className="space-y-8 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-lime">{brand.origin}</p>
        <h1 className="mt-3 font-display text-5xl text-ink-100">{brand.name}</h1>
        <p className="mt-4 max-w-2xl text-ink-500">{brand.shortDescription}</p>
      </div>
      <section>
        <h2 className="font-display text-2xl text-ink-100">Models</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {models.map((model) => (
            <span key={model.id} className="rounded-sm border border-ink-700 px-3 py-1.5 text-sm">
              {model.name}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink-100">Compatible parts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categories.find((category) => category.id === product.categoryId)}
              models={models}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
