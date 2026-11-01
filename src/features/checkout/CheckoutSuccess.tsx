"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppSelector } from "@/store/hooks";

export function CheckoutSuccess({ requestId }: { requestId: string }) {
  const request = useAppSelector((state) =>
    state.quotations.requests.find((item) => item.id === requestId),
  );

  return (
    <Card className="mx-auto max-w-2xl p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-lime">Request received</p>
      <h1 className="mt-3 font-display text-4xl text-ink-100">Quotation request {requestId}</h1>
      <p className="mt-4 text-sm leading-7 text-ink-500">
        The desk now has your part list{request ? ` (${request.items.length} lines)` : ""}. Status is
        Awaiting Quotation. This prototype does not promise a response time. An admin signs in with
        admin@gmail.com to enter current prices.
      </p>
      <ol className="mt-6 space-y-2 text-sm text-ink-300">
        <li>01 Admin reviews the requested parts.</li>
        <li>02 A quotation and invoice appear in your account.</li>
        <li>03 You accept or reject. Delivery payment comes only after accept.</li>
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/account/quotations">View my requests</Button>
        <Button href="/products" variant="secondary">
          Keep shopping
        </Button>
      </div>
    </Card>
  );
}
