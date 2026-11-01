export type PurchaseType = "individual" | "wholesale";

export type QuotationStatus =
  | "awaiting_quotation"
  | "quoted"
  | "accepted"
  | "rejected"
  | "expired";

export type OrderStatus =
  | "awaiting_delivery_payment"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "delivery_paid" | "fully_paid";

export interface CartItem {
  productId: string;
  quantity: number;
  selectedModelId?: string;
  addedAt: string;
}

export interface QuotationLine {
  productId: string;
  quantity: number;
  unitPriceBdt?: number;
}

export interface QuotationRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  division: string;
  district: string;
  area: string;
  address: string;
  deliveryInstructions?: string;
  deliveryPreference?: string;
  purchaseType: PurchaseType;
  notes?: string;
  items: QuotationLine[];
  status: QuotationStatus;
  createdAt: string;
}

export interface Quotation {
  id: string;
  requestId: string;
  invoiceId: string;
  items: Required<QuotationLine>[];
  deliveryChargeBdt: number;
  discountBdt: number;
  notes?: string;
  validUntil: string;
  status: QuotationStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  quotationId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}
