export type ListingCondition = "new" | "used";

export interface SellerListing {
  id: string;
  title: string;
  categoryId: string;
  manufacturer: string;
  compatibleModelIds: string[];
  condition: ListingCondition;
  description: string;
  quantity: number;
  availableForWholesale: boolean;
  contactPreference: "phone" | "whatsapp" | "email";
  createdAt: string;
}
