import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ProductCardActions } from "@/components/product/ProductCardActions";
import { ProductVisual } from "@/components/product/ProductVisual";
import { priceRequestLabel } from "@/lib/constants/quotation";
import { formatSku } from "@/lib/formatters/text";
import { productHref } from "@/lib/utils/routes";
import type { Category, MotorcycleModel, Product } from "@/types";

const classificationTone = {
  genuine: "lime",
  oem: "success",
  aftermarket: "muted",
} as const;

export function ProductCard({
  product,
  category,
  models,
}: {
  product: Product;
  category?: Category;
  models: MotorcycleModel[];
}) {
  const compatible = models.filter((model) =>
    product.compatibleModelIds.includes(model.id),
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-ink-700 bg-ink-850">
      <Link href={productHref(product.slug)} className="block">
        <ProductVisual
          categoryId={product.categoryId}
          accent={category?.accent ?? "#C8FF00"}
          className="h-44"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={classificationTone[product.classification]}>
            {product.classification}
          </Badge>
          <Badge>{product.condition}</Badge>
        </div>
        <div>
          <Link href={productHref(product.slug)} className="block">
            <h3 className="font-display text-xl leading-7 text-ink-100 hover:text-lime">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 font-mono text-xs tracking-wide text-ink-500">
            {formatSku(product.sku)} · {product.partNumber}
          </p>
        </div>
        <p className="text-sm leading-6 text-ink-500">{product.shortDescription}</p>
        {compatible.length ? (
          <p className="text-xs uppercase tracking-[0.14em] text-ink-300">
            Fits {compatible.map((model) => model.name).join(", ")}
          </p>
        ) : null}
        <div className="mt-auto space-y-3">
          <p className="text-sm font-medium text-lime">{priceRequestLabel}</p>
          <ProductCardActions productId={product.id} productName={product.name} />
        </div>
      </div>
    </article>
  );
}
