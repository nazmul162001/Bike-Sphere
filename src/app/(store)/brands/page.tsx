import { BrandGrid } from "@/components/home/BrandGrid";
import { catalogService } from "@/services/adapters/catalog";

export const metadata = {
  title: "Motorcycle brands",
};

export default function BrandsPage() {
  return <BrandGrid brands={catalogService.listBrands()} />;
}
