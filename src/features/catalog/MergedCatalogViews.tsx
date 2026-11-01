"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";

export function MergedProductGrid() {
  const { products, categories, models } = useMergedCatalog();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          category={categories.find((category) => category.id === product.categoryId)}
          models={models}
        />
      ))}
    </div>
  );
}

export function MergedCategoryGrid() {
  const { categories } = useMergedCatalog();
  return <CategoryGrid categories={categories} />;
}

export function MergedCategoryProducts({ slug }: { slug: string }) {
  const { categories, products, models } = useMergedCatalog();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return <EmptyState title="Category missing" description="This category is not in the mock or admin catalog." />;
  }

  const items = products.filter((product) => product.categoryId === category.id);

  return (
    <div className="space-y-8">
      <div>
        <span className="mb-4 block h-1 w-12" style={{ background: category.accent }} />
        <h1 className="font-display text-5xl text-ink-100">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-ink-500">{category.description}</p>
      </div>
      {items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} category={category} models={models} />
          ))}
        </div>
      ) : (
        <p className="text-ink-500">No products are assigned to this category yet.</p>
      )}
    </div>
  );
}
