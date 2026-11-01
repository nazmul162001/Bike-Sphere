export type UserRole = "guest" | "user" | "seller" | "admin";

export interface PrototypeUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarDataUrl?: string;
}
