import { Button } from "@/components/ui/Button";
import { AdminProductsTable } from "@/features/admin/AdminCollections";

export const instant = false;
export const metadata = { title: "Admin products" };

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <Button href="/admin/products/new" size="sm">
        New product
      </Button>
      <AdminProductsTable />
    </div>
  );
}
