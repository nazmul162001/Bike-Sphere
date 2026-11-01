export type PartClassification = "genuine" | "oem" | "aftermarket";
export type PartCondition = "new" | "used";
export type AvailabilityStatus =
  | "in_stock"
  | "limited"
  | "made_to_order"
  | "out_of_stock";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  partNumber: string;
  manufacturer: string;
  categoryId: string;
  classification: PartClassification;
  condition: PartCondition;
  availability: AvailabilityStatus;
  shortDescription: string;
  description: string;
  specifications: ProductSpecification[];
  compatibleModelIds: string[];
  image: ProductImage;
  gallery: ProductImage[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  tags: string[];
}
