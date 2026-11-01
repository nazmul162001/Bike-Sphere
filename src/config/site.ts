export const siteConfig = {
  name: "BikeSphere",
  shortName: "BikeSphere",
  tagline: "Authentic motorcycle parts. Quoted to today's market.",
  description:
    "BikeSphere is a quotation-first motorcycle parts marketplace for riders, workshops, and importers in Bangladesh. Browse authentic spare parts, request a live quotation, and purchase after a confirmed invoice.",
  locale: "en-BD",
  country: "Bangladesh",
  currency: "BDT",
  prototypeNotice:
    "Frontend prototype. Catalog, quotations, and checkout use mock state only. No live inventory, payments, or identity verification.",
  contact: {
    email: "hello@bikesphere.bd",
    phone: "+880 1700-000000",
    whatsapp: "+880 1700-000000",
    hours: "Saturday–Thursday, 10:00–19:00 BST",
  },
  serviceAreas: [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
