"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCardActions } from "@/components/product/ProductCardActions";
import { RememberViewed } from "@/components/product/RememberViewed";
import { ProductVisual } from "@/components/product/ProductVisual";
import { priceRequestLabel, quotationCopy } from "@/lib/constants/quotation";
import { formatSku } from "@/lib/formatters/text";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";
import type { Product } from "@/types";

export function ProductDetailView({ product }: { product: Product }) {
  const { categories, models } = useMergedCatalog();
  const category = categories.find((item) => item.id === product.categoryId);
  const fit = models.filter((model) => product.compatibleModelIds.includes(model.id));

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <ProductVisual
        categoryId={product.categoryId}
        accent={category?.accent ?? "#C8FF00"}
        className="min-h-[360px] rounded-md border border-ink-700"
      />
      <div className="space-y-5">
        <RememberViewed productId={product.id} />
        <p className="text-xs uppercase tracking-[0.2em] text-ink-500">{category?.name}</p>
        <h1 className="font-display text-4xl text-ink-100">{product.name}</h1>
        <p className="font-mono text-sm text-ink-500">
          {formatSku(product.sku)} · {product.partNumber} · {product.manufacturer}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="lime">{product.classification}</Badge>
          <Badge>{product.condition}</Badge>
          <Badge tone="muted">{product.availability.replaceAll("_", " ")}</Badge>
        </div>
        <p className="max-w-xl text-ink-500">{product.description}</p>
        <p className="text-lg font-medium text-lime">{priceRequestLabel}</p>
        <p className="max-w-xl text-sm text-ink-500">{quotationCopy.noPublicPrice}</p>
        <ProductCardActions productId={product.id} productName={product.name} />
        <div>
          <h2 className="font-display text-xl text-ink-100">Compatible motorcycles</h2>
          <ul className="mt-2 space-y-1 text-sm text-ink-500">
            {fit.length ? fit.map((model) => <li key={model.id}>{model.name}</li>) : <li>No models selected</li>}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink-100">Specifications</h2>
          <dl className="mt-3 divide-y divide-ink-700 border-y border-ink-700">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-ink-500">{spec.label}</dt>
                <dd className="text-ink-100">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Button href="/products" variant="secondary">
          Back to catalog
        </Button>
      </div>
    </div>
  );
}

export function ExtraProductDetail({ slug }: { slug: string }) {
  const { products } = useMergedCatalog();
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    return <EmptyState title="Part missing" description="This product is not in the mock or admin catalog." />;
  }
  return <ProductDetailView product={product} />;
}
