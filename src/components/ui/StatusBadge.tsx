import { Badge } from "@/components/ui/Badge";
import type { OrderStatus, PaymentStatus, QuotationStatus } from "@/types";

const quotationTone: Record<QuotationStatus, "lime" | "success" | "warning" | "danger" | "muted"> = {
  awaiting_quotation: "warning",
  quoted: "lime",
  accepted: "success",
  rejected: "danger",
  expired: "muted",
};

const orderTone: Record<OrderStatus, "lime" | "success" | "warning" | "danger" | "muted"> = {
  awaiting_delivery_payment: "warning",
  processing: "lime",
  out_for_delivery: "lime",
  delivered: "success",
  completed: "success",
  cancelled: "danger",
};

export function QuotationStatusBadge({ status }: { status: QuotationStatus }) {
  return <Badge tone={quotationTone[status]}>{status.replaceAll("_", " ")}</Badge>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={orderTone[status]}>{status.replaceAll("_", " ")}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge tone={status === "unpaid" ? "warning" : status === "fully_paid" ? "success" : "lime"}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
}
