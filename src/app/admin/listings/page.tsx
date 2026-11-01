import { CatalogTable } from "@/features/admin/AdminCollections";

export const metadata = { title: "Listings" };

export default function Page() {
  return (
    <CatalogTable
      title="Listings"
      rows={[{ id: "list-1", primary: "Used R15 fairing", secondary: "Awaiting review · mock" }]}
    />
  );
}
