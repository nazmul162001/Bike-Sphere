import { CatalogTable } from "@/features/admin/AdminCollections";

export const metadata = { title: "Sellers" };

export default function Page() {
  return (
    <CatalogTable
      title="Sellers"
      rows={[{ id: "seller-1", primary: "Mirpur Workshop", secondary: "Prototype seller profile" }]}
    />
  );
}
