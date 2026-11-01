import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  remember: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    phone: z.string().min(8, "Enter a phone number."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm your password."),
    terms: z.boolean().refine((value) => value, "Accept the prototype terms to continue."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
