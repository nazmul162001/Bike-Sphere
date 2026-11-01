import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
  description?: string;
};

export const primaryNav: NavItem[] = [
  {
    label: "Find Parts",
    href: "/find-parts",
    description: "Select your motorcycle and see compatible parts.",
  },
  {
    label: "Parts",
    href: "/products",
    description: "Browse the full quotation catalog.",
  },
  {
    label: "Brands",
    href: "/brands",
    description: "Yamaha, Honda, Bajaj, and more.",
  },
  {
    label: "Categories",
    href: "/categories",
    description: "Engine, brakes, electrical, gear, and extras.",
  },
  {
    label: "Sell",
    href: "/sell",
    description: "List parts as a workshop or importer.",
  },
];

export const accountNav: NavItem[] = [
  { label: "Overview", href: "/account" },
  { label: "Profile", href: "/account/profile" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "My Bikes", href: "/account/my-bikes" },
  { label: "Quotations", href: "/account/quotations" },
  { label: "Orders", href: "/account/orders" },
  { label: "Invoices", href: "/account/invoices" },
  { label: "Favorites", href: "/account/favorites" },
  { label: "Recently viewed", href: "/account/recently-viewed" },
  { label: "Settings", href: "/account/settings" },
];

export const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Brands", href: "/admin/brands" },
  { label: "Motorcycles", href: "/admin/motorcycles" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Quotation requests", href: "/admin/quotation-requests" },
  { label: "Quotations", href: "/admin/quotations" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Sellers", href: "/admin/sellers" },
  { label: "Listings", href: "/admin/listings" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];

export const footerNav = {
  shop: [
    { label: "All parts", href: "/products" },
    { label: "Find parts for my bike", href: "/find-parts" },
    { label: "Motorcycle brands", href: "/brands" },
    { label: "Categories", href: "/categories" },
    { label: "Search", href: "/search" },
  ],
  account: [
    { label: "Sign in", href: "/login" },
    { label: "Create account", href: "/signup" },
    { label: "Quotations", href: "/account/quotations" },
    { label: "Orders", href: "/account/orders" },
    { label: "Saved bikes", href: "/account/my-bikes" },
  ],
  marketplace: [
    { label: "Sell on BikeSphere", href: "/sell" },
    { label: "Seller registration", href: "/seller/register" },
    { label: "Seller dashboard", href: "/seller/dashboard" },
  ],
  company: [
    { label: "Admin desk", href: "/admin" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ],
} as const;
