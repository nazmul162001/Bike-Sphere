"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/StatusBadge";
import { adminOrderHref } from "@/lib/utils/routes";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import type { OrderStatus } from "@/types";

export function AdminOrderList() {
  const orders = useAppSelector((state) => state.orders.orders);
  if (orders.length === 0) {
    return <EmptyState title="No orders" description="Orders appear when a customer accepts a quotation." />;
  }
  return (
    <div className="space-y-3">
      <h1 className="font-display text-3xl">Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p>{order.id}</p>
          <OrderStatusBadge status={order.status} />
          <Button href={adminOrderHref(order.id)} size="sm" variant="secondary">
            Open
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function AdminOrderDetail({ id }: { id: string }) {
  const order = useAppSelector((state) => state.orders.orders.find((item) => item.id === id));
  const dispatch = useAppDispatch();
  if (!order) return <EmptyState title="Order missing" description="This order is not in mock state." />;

  const statuses: OrderStatus[] = [
    "awaiting_delivery_payment",
    "processing",
    "out_for_delivery",
    "delivered",
    "completed",
    "cancelled",
  ];

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{order.id}</h1>
      <div className="flex gap-2">
        <OrderStatusBadge status={order.status} />
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Button
            key={status}
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => dispatch(updateOrder({ ...order, status }))}
          >
            {status.replaceAll("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function CatalogTable({
  title,
  rows,
}: {
  title: string;
  rows: { id: string; primary: string; secondary: string }[];
}) {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl">{title}</h1>
      <div className="overflow-x-auto rounded-md border border-ink-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-900 text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-ink-700">
                <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                <td className="px-4 py-3">{row.primary}</td>
                <td className="px-4 py-3 text-ink-500">{row.secondary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminProductsTable() {
  const { products } = useMergedCatalog();
  return (
    <CatalogTable
      title="Products"
      rows={products.map((product) => ({
        id: product.sku,
        primary: product.name,
        secondary: `${product.classification} · ${product.availability.replaceAll("_", " ")} · ${product.compatibleModelIds.length} models`,
      }))}
    />
  );
}

export function AdminCustomers() {
  return (
    <CatalogTable
      title="Customers"
      rows={[
        { id: "user-demo", primary: "Nazmul", secondary: "user@gmail.com · user" },
        { id: "admin-demo", primary: "Arif Hossain", secondary: "admin@gmail.com · admin" },
      ]}
    />
  );
}
