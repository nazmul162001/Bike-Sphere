import { AdminFormNotice } from "@/features/admin/AdminSimplePages";

export const metadata = { title: "Edit product" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminFormNotice title={`Edit ${id}`} fields={["Name", "SKU", "Stock status"]} />;
}
