import { catalogService } from "@/services/adapters/catalog";
import { useAppSelector } from "@/store/hooks";

export function useMergedCatalog() {
  const extras = useAppSelector((state) => state.catalog) ?? {
    extraCategories: [],
    extraProducts: [],
  };

  return {
    categories: [...extras.extraCategories, ...catalogService.listCategories()],
    products: [...extras.extraProducts, ...catalogService.listProducts()],
    brands: catalogService.listBrands(),
    models: catalogService.listModels(),
  };
}
