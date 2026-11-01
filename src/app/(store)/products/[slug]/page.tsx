import { Container } from "@/components/ui/Container";
import { ExtraProductDetail } from "@/features/catalog/ProductDetailView";
import { catalogService } from "@/services/adapters/catalog";

export async function generateStaticParams() {
  return catalogService.listProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalogService.getProductBySlug(slug);
  return {
    title: product?.name ?? "Part",
    description: product?.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Container className="py-12">
      <ExtraProductDetail slug={slug} />
    </Container>
  );
}
