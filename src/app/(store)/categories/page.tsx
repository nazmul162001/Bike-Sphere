import { MergedCategoryGrid } from "@/features/catalog/MergedCatalogViews";

export const instant = false;
export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return <MergedCategoryGrid />;
}
