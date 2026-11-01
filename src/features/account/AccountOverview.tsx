"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppSelector } from "@/store/hooks";

export function AccountOverview() {
  const user = useAppSelector((state) => state.auth.user);
  const requests = useAppSelector((state) =>
    state.quotations.requests.filter((item) => item.email === user?.email),
  );
  const quotations = useAppSelector((state) => state.quotations.quotations);
  const myQuoted = quotations.filter((quotation) =>
    requests.some((request) => request.id === quotation.requestId),
  );
  const orders = useAppSelector((state) => state.orders.orders).filter((order) =>
    myQuoted.some((quotation) => quotation.id === order.quotationId),
  );

  const stats = [
    { label: "Quotation requests", value: requests.length },
    { label: "Pending quotations", value: requests.filter((item) => item.status === "awaiting_quotation").length },
    { label: "Active orders", value: orders.filter((item) => item.status !== "completed" && item.status !== "cancelled").length },
    { label: "Completed orders", value: orders.filter((item) => item.status === "completed").length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Account</p>
        <h1 className="mt-2 font-display text-4xl text-ink-100">Welcome, {user?.name}</h1>
        <p className="mt-2 text-sm text-ink-500">
          {user?.email} · role {user?.role}. This is a simulated customer desk.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{stat.label}</p>
            <p className="mt-2 font-display text-3xl text-ink-100">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="/account/quotations">Quotations</Button>
        <Button href="/cart" variant="secondary">
          Request list
        </Button>
        <Button href="/account/my-bikes" variant="ghost">
          My bikes
        </Button>
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl text-ink-100">Recent requests</h2>
        {requests.length === 0 ? (
          <p className="mt-3 text-sm text-ink-500">No quotation requests yet. Submit a list from checkout.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {requests.slice(0, 4).map((request) => (
              <li key={request.id} className="flex justify-between border-b border-ink-700 py-2">
                <span>{request.id}</span>
                <span className="text-ink-500">{request.status.replaceAll("_", " ")}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
