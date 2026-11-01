import { AdminProductForm } from "@/features/admin/AdminProductForm";

export const instant = false;
export const metadata = { title: "New product" };

export default function Page() {
  return <AdminProductForm />;
}
