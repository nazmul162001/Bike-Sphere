"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuotationStatusBadge } from "@/components/ui/StatusBadge";
import { formatBdt, quotationTotal } from "@/lib/formatters/money";
import { accountOrderHref, accountQuotationHref } from "@/lib/utils/routes";
import { invoiceId, orderId } from "@/lib/utils/ids";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOrder, updateOrder } from "@/store/slices/orderSlice";
import { updateQuotation, updateRequest } from "@/store/slices/quotationSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function QuotationList() {
  const user = useAppSelector((state) => state.auth.user);
  const requests = useAppSelector((state) =>
    state.quotations.requests.filter((item) => item.email === user?.email),
  );
  const quotations = useAppSelector((state) => state.quotations.quotations);

  if (requests.length === 0) {
    return (
      <EmptyState
        title="No quotation requests"
        description="Submit a request list from checkout. Status starts as Awaiting Quotation."
        action={<Button href="/cart">Open request list</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Quotations</h1>
      {requests.map((request) => {
        const quotation = quotations.find((item) => item.requestId === request.id);
        return (
          <Card key={request.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-ink-100">{request.id}</p>
              <p className="text-sm text-ink-500">{request.items.length} lines · {request.purchaseType}</p>
            </div>
            <QuotationStatusBadge status={quotation?.status ?? request.status} />
            <Button href={accountQuotationHref(request.id)} size="sm" variant="secondary">
              Open
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

export function QuotationDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const request = useAppSelector((state) => state.quotations.requests.find((item) => item.id === id));
  const quotation = useAppSelector((state) =>
    state.quotations.quotations.find((item) => item.requestId === id),
  );
  const products = catalogService.listProducts();

  if (!request) {
    return <EmptyState title="Request not found" description="This quotation id is not in the prototype store." />;
  }

  function accept() {
    if (!quotation || !request) return;
    dispatch(updateQuotation({ ...quotation, status: "accepted" }));
    dispatch(updateRequest({ ...request, status: "accepted" }));
    const nextOrderId = orderId();
    dispatch(
      addOrder({
        id: nextOrderId,
        quotationId: quotation.id,
        status: "awaiting_delivery_payment",
        paymentStatus: "unpaid",
        createdAt: new Date().toISOString(),
      }),
    );
    dispatch(pushToast({ tone: "success", title: "Quotation accepted", description: nextOrderId }));
  }

  function reject() {
    if (!quotation || !request) return;
    dispatch(updateQuotation({ ...quotation, status: "rejected" }));
    dispatch(updateRequest({ ...request, status: "rejected" }));
    dispatch(pushToast({ tone: "warning", title: "Quotation rejected" }));
  }

  const total = quotation
    ? quotationTotal(quotation)
    : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink-100">{request.id}</h1>
        <QuotationStatusBadge status={quotation?.status ?? request.status} />
      </div>
      <p className="text-sm text-ink-500">
        {request.customerName} · {request.division} · {request.purchaseType}
      </p>
      <Card className="divide-y divide-ink-700">
        {request.items.map((line) => {
          const product = products.find((item) => item.id === line.productId);
          const quoted = quotation?.items.find((item) => item.productId === line.productId);
          return (
            <div key={line.productId} className="flex justify-between gap-4 px-4 py-3 text-sm">
              <span>
                {product?.name} × {line.quantity}
              </span>
              <span className="text-lime">
                {quoted ? formatBdt(quoted.unitPriceBdt * quoted.quantity) : "Awaiting Quotation"}
              </span>
            </div>
          );
        })}
      </Card>
      {quotation ? (
        <div className="space-y-2 text-sm">
          <p>Delivery charge: {formatBdt(quotation.deliveryChargeBdt)}</p>
          <p>Discount: {formatBdt(quotation.discountBdt)}</p>
          <p className="text-lg text-ink-100">Total: {formatBdt(total ?? 0)}</p>
          <p className="text-ink-500">Valid until {quotation.validUntil}. Invoice {quotation.invoiceId || invoiceId()}.</p>
          {quotation.status === "quoted" ? (
            <div className="flex gap-3 pt-2">
              <Button type="button" onClick={accept}>
                Accept quotation
              </Button>
              <Button type="button" variant="secondary" onClick={reject}>
                Reject
              </Button>
            </div>
          ) : null}
          {quotation.status === "accepted" ? (
            <Button href="/account/orders">Open orders</Button>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-ink-500">The admin desk has not entered prices yet.</p>
      )}
    </div>
  );
}

export function OrderList() {
  const user = useAppSelector((state) => state.auth.user);
  const requests = useAppSelector((state) =>
    state.quotations.requests.filter((item) => item.email === user?.email),
  );
  const quotations = useAppSelector((state) => state.quotations.quotations);
  const mine = quotations.filter((quotation) =>
    requests.some((request) => request.id === quotation.requestId),
  );
  const orders = useAppSelector((state) =>
    state.orders.orders.filter((order) => mine.some((quotation) => quotation.id === order.quotationId)),
  );

  if (orders.length === 0) {
    return <EmptyState title="No orders" description="Orders appear after you accept a quotation." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="flex items-center justify-between p-4">
          <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-ink-500">{order.status.replaceAll("_", " ")}</p>
          </div>
          <Button href={accountOrderHref(order.id)} size="sm" variant="secondary">
            Details
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function OrderDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orders.orders.find((item) => item.id === id));
  const quotation = useAppSelector((state) =>
    state.quotations.quotations.find((item) => item.id === order?.quotationId),
  );

  if (!order || !quotation) {
    return <EmptyState title="Order not found" description="Accept a quotation to create an order." />;
  }

  const remaining = quotationTotal({
    ...quotation,
    deliveryChargeBdt: 0,
  });

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-ink-100">{order.id}</h1>
      <p className="text-sm text-ink-500">
        Status {order.status.replaceAll("_", " ")} · Payment {order.paymentStatus.replaceAll("_", " ")}
      </p>
      <ol className="space-y-2 text-sm text-ink-300">
        <li>Accepted quotation {quotation.id}</li>
        <li>Delivery charge {formatBdt(quotation.deliveryChargeBdt)} is due first</li>
        <li>Remaining product amount {formatBdt(remaining)} is collected after delivery</li>
      </ol>
      {order.paymentStatus === "unpaid" ? (
        <Button
          type="button"
          onClick={() => {
            dispatch(
              updateOrder({
                ...order,
                paymentStatus: "delivery_paid",
                status: "processing",
              }),
            );
            dispatch(pushToast({ tone: "success", title: "Delivery payment simulated" }));
          }}
        >
          Pay delivery charge (prototype)
        </Button>
      ) : (
        <p className="text-sm text-success">Delivery payment recorded in mock state.</p>
      )}
    </div>
  );
}
