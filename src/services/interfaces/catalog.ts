import type {
  Category,
  CustomerReview,
  FaqItem,
  MotorcycleBrand,
  MotorcycleModel,
  ProcessStep,
  Product,
} from "@/types";

export interface CatalogRepository {
  listProducts(): Product[];
  getProductBySlug(slug: string): Product | undefined;
  getProductById(id: string): Product | undefined;
  listFeaturedProducts(): Product[];
  listNewProducts(): Product[];
  listBestSellingProducts(): Product[];
  listCategories(): Category[];
  getCategoryBySlug(slug: string): Category | undefined;
  listBrands(): MotorcycleBrand[];
  getBrandBySlug(slug: string): MotorcycleBrand | undefined;
  listModels(): MotorcycleModel[];
  listModelsByBrand(brandId: string): MotorcycleModel[];
  listPopularModels(): MotorcycleModel[];
  listReviews(): CustomerReview[];
  listFaqs(): FaqItem[];
  listQuotationSteps(): ProcessStep[];
  searchProducts(query: string): Product[];
}
