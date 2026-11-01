"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { QuotationStatusBadge } from "@/components/ui/StatusBadge";
import { formatBdt, quotationTotal } from "@/lib/formatters/money";
import { adminRequestHref } from "@/lib/utils/routes";
import { invoiceId, quotationId } from "@/lib/utils/ids";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addQuotation, updateQuotation, updateRequest } from "@/store/slices/quotationSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function QuotationRequestList() {
  const requests = useAppSelector((state) => state.quotations.requests);

  if (requests.length === 0) {
    return (
      <EmptyState
        title="No quotation requests"
        description="When a customer submits checkout, the request appears here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Quotation requests</h1>
      {requests.map((request) => (
        <Card key={request.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-medium">{request.id}</p>
            <p className="text-sm text-ink-500">
              {request.customerName} · {request.email} · {request.items.length} lines
            </p>
          </div>
          <QuotationStatusBadge status={request.status} />
          <Button href={adminRequestHref(request.id)} size="sm">
            Review
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function QuotationRequestEditor({ id }: { id: string }) {
  const request = useAppSelector((state) => state.quotations.requests.find((item) => item.id === id));
  const existing = useAppSelector((state) =>
    state.quotations.quotations.find((item) => item.requestId === id),
  );
  const dispatch = useAppDispatch();
  const products = catalogService.listProducts();
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries((existing?.items ?? request?.items ?? []).map((item) => [item.productId, item.unitPriceBdt ?? 0])),
  );
  const [delivery, setDelivery] = useState(existing?.deliveryChargeBdt ?? 250);
  const [discount, setDiscount] = useState(existing?.discountBdt ?? 0);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [days, setDays] = useState(5);

  if (!request) {
    return <EmptyState title="Request missing" description="This id is not in mock state." />;
  }

  const draftItems = request.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    unitPriceBdt: prices[item.productId] ?? 0,
  }));

  const total = quotationTotal({
    items: draftItems,
    deliveryChargeBdt: delivery,
    discountBdt: discount,
  });

  function generate() {
    if (!request) return;
    const next = {
      id: existing?.id ?? quotationId(),
      requestId: request.id,
      invoiceId: existing?.invoiceId ?? invoiceId(),
      items: draftItems,
      deliveryChargeBdt: delivery,
      discountBdt: discount,
      notes,
      // Event handler only; date is captured at click time.
      validUntil: (() => {
        const expires = new Date();
        expires.setUTCDate(expires.getUTCDate() + days);
        return expires.toISOString().slice(0, 10);
      })(),
      status: "quoted" as const,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };
    if (existing) dispatch(updateQuotation(next));
    else dispatch(addQuotation(next));
    dispatch(updateRequest({ ...request, status: "quoted" }));
    dispatch(
      pushToast({
        tone: "success",
        title: "Quotation generated",
        description: "Simulated send to the customer account.",
      }),
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-lime">{request.id}</p>
        <h1 className="mt-2 font-display text-3xl text-ink-100">{request.customerName}</h1>
        <p className="mt-2 text-sm text-ink-500">
          {request.email} · {request.phone} · {request.address}, {request.area}, {request.district}
        </p>
      </div>
      <div className="space-y-3">
        {request.items.map((line) => {
          const product = products.find((item) => item.id === line.productId);
          return (
            <Card key={line.productId} className="grid gap-3 p-4 sm:grid-cols-[1fr_160px]">
              <div>
                <p className="font-medium">{product?.name}</p>
                <p className="text-sm text-ink-500">Qty {line.quantity} · {product?.sku}</p>
              </div>
              <Input
                label="Unit price (BDT)"
                type="number"
                value={prices[line.productId] ?? 0}
                onChange={(event) =>
                  setPrices((current) => ({
                    ...current,
                    [line.productId]: Number(event.target.value),
                  }))
                }
              />
            </Card>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Input label="Delivery charge" type="number" value={delivery} onChange={(event) => setDelivery(Number(event.target.value))} />
        <Input label="Discount" type="number" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} />
        <Input label="Validity (days)" type="number" value={days} onChange={(event) => setDays(Number(event.target.value))} />
      </div>
      <Textarea label="Quotation notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
      <p className="text-lg">Preview total {formatBdt(total)}</p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={generate}>
          Generate quotation
        </Button>
        <Button href="/admin/quotations" variant="secondary">
          Quotation list
        </Button>
      </div>
    </div>
  );
}

export function AdminQuotationList() {
  const quotations = useAppSelector((state) => state.quotations.quotations);
  if (quotations.length === 0) {
    return <EmptyState title="No quotations" description="Generate one from a request." />;
  }
  return (
    <div className="space-y-3">
      <h1 className="font-display text-3xl">Quotations</h1>
      {quotations.map((quotation) => (
        <Card key={quotation.id} className="flex justify-between p-4">
          <div>
            <p>{quotation.id}</p>
            <p className="text-sm text-ink-500">{quotation.invoiceId} · {formatBdt(quotationTotal(quotation))}</p>
          </div>
          <QuotationStatusBadge status={quotation.status} />
        </Card>
      ))}
    </div>
  );
}
