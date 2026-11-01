export interface MotorcycleBrand {
  id: string;
  slug: string;
  name: string;
  origin: string;
  shortDescription: string;
  popularInBangladesh: boolean;
}

export interface MotorcycleModel {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  segment: string;
  years: number[];
  variants: string[];
  isPopular: boolean;
}

export interface SavedBike {
  id: string;
  brandId: string;
  modelId: string;
  year: number;
  variant?: string;
  nickname?: string;
  isPrimary: boolean;
}
