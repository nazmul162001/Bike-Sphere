"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/product/ProductCard";
import { formatBdt, quotationTotal } from "@/lib/formatters/money";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { removeFavorite } from "@/store/slices/favoritesSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function InvoiceList() {
  const user = useAppSelector((state) => state.auth.user);
  const requests = useAppSelector((state) =>
    state.quotations.requests.filter((item) => item.email === user?.email),
  );
  const invoices = useAppSelector((state) =>
    state.quotations.quotations.filter((quotation) =>
      requests.some((request) => request.id === quotation.requestId),
    ),
  );

  if (invoices.length === 0) {
    return <EmptyState title="No invoices" description="Invoices appear after the admin generates a quotation." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Invoices</h1>
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-lime">{invoice.invoiceId}</p>
          <h2 className="mt-2 font-display text-2xl">{invoice.id}</h2>
          <p className="mt-2 text-sm text-ink-500">
            Delivery {formatBdt(invoice.deliveryChargeBdt)} · Total {formatBdt(quotationTotal(invoice))}
          </p>
          <div className="mt-4 flex gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => window.print()}>
              Print / download UI
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function FavoritesGrid() {
  const ids = useAppSelector((state) => state.favorites.productIds);
  const dispatch = useAppDispatch();
  const products = catalogService.listProducts().filter((product) => ids.includes(product.id));
  const categories = catalogService.listCategories();
  const models = catalogService.listModels();

  if (products.length === 0) {
    return <EmptyState title="No favorites" description="Save parts from the catalog." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Favorites</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard
              product={product}
              category={categories.find((category) => category.id === product.categoryId)}
              models={models}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  dispatch(addItem({ productId: product.id }));
                  dispatch(pushToast({ tone: "success", title: "Added to request list" }));
                }}
              >
                Add to cart
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => dispatch(removeFavorite(product.id))}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentlyViewedGrid() {
  const ids = useAppSelector((state) => state.products.recentlyViewedIds);
  const products = catalogService.listProducts().filter((product) => ids.includes(product.id));
  const categories = catalogService.listCategories();
  const models = catalogService.listModels();

  if (products.length === 0) {
    return <EmptyState title="Nothing viewed yet" description="Open a product page to start this list." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Recently viewed</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            category={categories.find((category) => category.id === product.categoryId)}
            models={models}
          />
        ))}
      </div>
    </div>
  );
}

export function SettingsPanel() {
  return (
    <div className="space-y-3">
      <h1 className="font-display text-3xl text-ink-100">Settings</h1>
      <p className="text-sm text-ink-500">
        Prototype preferences stay in this browser. There is no email, SMS, or identity verification.
      </p>
      <Card className="p-4 text-sm text-ink-300">
        Demo logins: user@gmail.com / user@gmail.com (user) and admin@gmail.com / admin@gmail.com
        (admin).
      </Card>
    </div>
  );
}
