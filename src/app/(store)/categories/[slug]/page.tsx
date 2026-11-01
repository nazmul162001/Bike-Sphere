import { Container } from "@/components/ui/Container";
import { MergedCategoryProducts } from "@/features/catalog/MergedCatalogViews";
import { catalogService } from "@/services/adapters/catalog";

export async function generateStaticParams() {
  return catalogService.listCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = catalogService.getCategoryBySlug(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Container className="py-12">
      <MergedCategoryProducts slug={slug} />
    </Container>
  );
}
