"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductVisual } from "@/components/product/ProductVisual";
import { quotationCopy } from "@/lib/constants/quotation";
import { formatSku } from "@/lib/formatters/text";
import { loginHref, productHref } from "@/lib/utils/routes";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors/cart";
import { selectIsAuthenticated } from "@/store/selectors/auth";
import { selectHasHydrated } from "@/store/selectors/ui";
import { removeItem, updateQuantity } from "@/store/slices/cartSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { Skeleton } from "@/components/ui/Skeleton";

export function CartWorkspace() {
  const items = useAppSelector(selectCartItems);
  const authenticated = useAppSelector(selectIsAuthenticated);
  const hydrated = useAppSelector(selectHasHydrated);
  const dispatch = useAppDispatch();
  const products = catalogService.listProducts();
  const categories = catalogService.listCategories();
  const models = catalogService.listModels();

  if (!hydrated) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your request list is empty"
        description="Add parts from the catalog. No prices are shown until the desk writes a quotation."
        action={<Button href="/products">Browse parts</Button>}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-3">
        {items.map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          const category = categories.find((entry) => entry.id === product.categoryId);
          const fit = models.filter((model) => product.compatibleModelIds.includes(model.id));

          return (
            <article
              key={`${item.productId}-${item.selectedModelId ?? "any"}`}
              className="flex flex-col gap-4 rounded-md border border-ink-700 bg-ink-850 p-4 sm:flex-row"
            >
              <ProductVisual
                categoryId={product.categoryId}
                accent={category?.accent ?? "#C8FF00"}
                className="h-28 w-full rounded-sm sm:w-36"
              />
              <div className="flex-1 space-y-2">
                <Link href={productHref(product.slug)} className="font-display text-xl text-ink-100 hover:text-lime">
                  {product.name}
                </Link>
                <p className="font-mono text-xs text-ink-500">
                  {formatSku(product.sku)} · {product.partNumber}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-300">
                  Fits {fit.map((model) => model.name).join(", ") || "listed models"}
                </p>
                <p className="text-sm text-lime">Price on Request</p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center border border-ink-700">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="grid size-9 place-items-center hover:bg-ink-800"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            selectedModelId: item.selectedModelId,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="grid size-9 place-items-center hover:bg-ink-800"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            selectedModelId: item.selectedModelId,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-ink-300 hover:text-lime"
                    onClick={() => dispatch(toggleFavorite(product.id))}
                  >
                    Move to favorites
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm text-error"
                    onClick={() =>
                      dispatch(
                        removeItem({
                          productId: item.productId,
                          selectedModelId: item.selectedModelId,
                        }),
                      )
                    }
                  >
                    <Trash2 className="size-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <aside className="h-fit space-y-4 rounded-md border border-ink-700 bg-ink-850 p-5">
        <h2 className="font-display text-2xl text-ink-100">Submit this list</h2>
        <p className="text-sm leading-6 text-ink-500">{quotationCopy.cartNotice}</p>
        <p className="text-sm text-ink-300">{items.length} part line{items.length === 1 ? "" : "s"} selected.</p>
        <p className="text-sm font-medium text-lime">No product total is calculated here.</p>
        <Button href={authenticated ? "/checkout" : loginHref("/checkout")} className="w-full">
          Proceed to quotation checkout
        </Button>
        <Button href="/products" variant="secondary" className="w-full">
          Continue shopping
        </Button>
      </aside>
    </div>
  );
}
