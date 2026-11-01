import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter the contact name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a phone number."),
  whatsapp: z.string().optional(),
  division: z.string().min(1, "Select a division."),
  district: z.string().min(1, "Select a district."),
  area: z.string().min(2, "Enter an area."),
  address: z.string().min(6, "Enter the full address."),
  deliveryInstructions: z.string().optional(),
  purchaseType: z.enum(["individual", "wholesale"]),
  deliveryPreference: z.string().min(1, "Select a delivery preference."),
  notes: z.string().optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
