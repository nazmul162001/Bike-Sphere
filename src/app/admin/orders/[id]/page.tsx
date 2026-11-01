import { AdminOrderDetail } from "@/features/admin/AdminCollections";

export const metadata = { title: "Admin order" };

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminOrderDetail id={id} />;
}
