"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CatalogTable } from "@/features/admin/AdminCollections";
import { catalogService } from "@/services/adapters/catalog";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

export function AdminCategoriesPage() {
  return (
    <CatalogTable
      title="Categories"
      rows={catalogService.listCategories().map((item) => ({
        id: item.slug,
        primary: item.name,
        secondary: item.description,
      }))}
    />
  );
}

export function AdminBrandsPage() {
  return (
    <CatalogTable
      title="Brands"
      rows={catalogService.listBrands().map((item) => ({
        id: item.slug,
        primary: item.name,
        secondary: item.origin,
      }))}
    />
  );
}

export function AdminMotorcyclesPage() {
  const brands = catalogService.listBrands();
  return (
    <CatalogTable
      title="Motorcycles"
      rows={catalogService.listModels().map((item) => ({
        id: item.slug,
        primary: item.name,
        secondary: `${brands.find((brand) => brand.id === item.brandId)?.name ?? ""} · ${item.years[0]}–${item.years[item.years.length - 1]}`,
      }))}
    />
  );
}

export function AdminInventoryPage() {
  const { products } = useMergedCatalog();
  return (
    <CatalogTable
      title="Inventory"
      rows={products.map((item) => ({
        id: item.sku,
        primary: item.name,
        secondary: item.availability.replaceAll("_", " "),
      }))}
    />
  );
}

export function AdminFormNotice({ title, fields }: { title: string; fields: string[] }) {
  const dispatch = useAppDispatch();
  return (
    <Card className="max-w-xl space-y-4 p-5">
      <h1 className="font-display text-3xl">{title}</h1>
      {fields.map((field) => (
        <Input key={field} label={field} name={field.toLowerCase()} />
      ))}
      <Textarea label="Notes" />
      <Button
        type="button"
        onClick={() =>
          dispatch(
            pushToast({
              tone: "info",
              title: "Prototype save",
              description: "This form is stored only as a confirmation. Catalog writes wait for the API.",
            }),
          )
        }
      >
        Save
      </Button>
    </Card>
  );
}
