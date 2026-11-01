import {
  categories,
  customerReviews,
  faqs,
  motorcycleBrands,
  motorcycleModels,
  products,
  quotationSteps,
} from "@/data/mock";
import type { CatalogRepository } from "@/services/interfaces/catalog";
import type { Product } from "@/types";

function matchesQuery(product: Product, query: string) {
  const haystack = [
    product.name,
    product.sku,
    product.partNumber,
    product.manufacturer,
    ...product.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export const mockCatalogRepository: CatalogRepository = {
  listProducts: () => products,
  getProductBySlug: (slug) => products.find((product) => product.slug === slug),
  getProductById: (id) => products.find((product) => product.id === id),
  listFeaturedProducts: () => products.filter((product) => product.isFeatured),
  listNewProducts: () => products.filter((product) => product.isNew),
  listBestSellingProducts: () => products.filter((product) => product.isBestSeller),
  listCategories: () => categories,
  getCategoryBySlug: (slug) => categories.find((category) => category.slug === slug),
  listBrands: () => motorcycleBrands,
  getBrandBySlug: (slug) => motorcycleBrands.find((brand) => brand.slug === slug),
  listModels: () => motorcycleModels,
  listModelsByBrand: (brandId) =>
    motorcycleModels.filter((model) => model.brandId === brandId),
  listPopularModels: () => motorcycleModels.filter((model) => model.isPopular),
  listReviews: () => customerReviews,
  listFaqs: () => faqs,
  listQuotationSteps: () => quotationSteps,
  searchProducts: (query) => {
    const value = query.trim();
    if (!value) return [];
    return products.filter((product) => matchesQuery(product, value));
  },
};
