import type { PrototypeUser } from "@/types";

export const demoUsers: Record<string, PrototypeUser> = {
  "user@gmail.com": {
    id: "user-demo",
    name: "Nazmul",
    email: "user@gmail.com",
    phone: "+880 1711-223344",
    role: "user",
  },
  "admin@gmail.com": {
    id: "admin-demo",
    name: "Arif Hossain",
    email: "admin@gmail.com",
    phone: "+880 1811-556677",
    role: "admin",
  },
};

export function demoPassword(email: string) {
  return email.trim().toLowerCase();
}

export function authenticateDemo(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const account = demoUsers[normalized];
  if (!account) return null;
  if (password !== demoPassword(account.email)) return null;
  return account;
}
