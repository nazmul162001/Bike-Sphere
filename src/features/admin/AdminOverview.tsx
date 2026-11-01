"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { catalogService } from "@/services/adapters/catalog";
import { useAppSelector } from "@/store/hooks";

export function AdminOverview() {
  const admin = useAppSelector((state) => state.auth.user);
  const requests = useAppSelector((state) => state.quotations.requests);
  const orders = useAppSelector((state) => state.orders.orders);
  const products = catalogService.listProducts();

  const stats = [
    { label: "Products", value: products.length },
    { label: "Customers", value: 2 },
    { label: "Pending requests", value: requests.filter((item) => item.status === "awaiting_quotation").length },
    { label: "Active orders", value: orders.filter((item) => item.status !== "completed").length },
  ];

  const chart = [
    { name: "Requests", value: requests.length },
    { name: "Quoted", value: requests.filter((item) => item.status === "quoted" || item.status === "accepted").length },
    { name: "Accepted", value: requests.filter((item) => item.status === "accepted").length },
    { name: "Orders", value: orders.length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Admin desk</p>
        <h1 className="mt-2 font-display text-4xl text-ink-100">Operations</h1>
        <p className="mt-2 text-sm text-ink-500">
          Signed in as {admin?.name} · {admin?.email} · role {admin?.role}. Pricing and payments are
          simulated. Revenue figures below are illustrative mock totals only when quotations exist.
        </p>
      </div>
      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-lime">Admin profile</p>
          <h2 className="mt-2 font-display text-2xl">{admin?.name}</h2>
          <p className="mt-1 text-sm text-ink-500">
            {admin?.email} · {admin?.phone}
          </p>
        </div>
        <Button href="/admin/settings" variant="secondary" size="sm">
          Desk settings
        </Button>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{stat.label}</p>
            <p className="mt-2 font-display text-3xl">{stat.value}</p>
          </Card>
        ))}
      </div>
      <Card className="h-72 p-4">
        <h2 className="mb-4 font-display text-xl">Quotation conversion</h2>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chart}>
            <XAxis dataKey="name" stroke="#929BA3" />
            <YAxis allowDecimals={false} stroke="#929BA3" />
            <Tooltip />
            <Bar dataKey="value" fill="#C8FF00" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4">
        <h2 className="font-display text-xl">Recent quotation requests</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {requests.slice(0, 5).map((request) => (
            <li key={request.id} className="flex justify-between border-b border-ink-700 py-2">
              <span>{request.id} · {request.customerName}</span>
              <span className="text-ink-500">{request.status.replaceAll("_", " ")}</span>
            </li>
          ))}
          {requests.length === 0 ? <li className="text-ink-500">No requests yet.</li> : null}
        </ul>
      </Card>
    </div>
  );
}
