import type { Route } from "next";

export function searchHref(query?: string): Route {
  return (query ? `/search?q=${encodeURIComponent(query)}` : "/search") as Route;
}

export function brandHref(slug: string): Route {
  return `/brands/${slug}` as Route;
}

export function categoryHref(slug: string): Route {
  return `/categories/${slug}` as Route;
}

export function productHref(slug: string): Route {
  return `/products/${slug}` as Route;
}

export function loginHref(next?: string): Route {
  return (next ? `/login?next=${encodeURIComponent(next)}` : "/login") as Route;
}

export function accountQuotationHref(id: string): Route {
  return `/account/quotations/${id}` as Route;
}

export function accountOrderHref(id: string): Route {
  return `/account/orders/${id}` as Route;
}

export function adminRequestHref(id: string): Route {
  return `/admin/quotation-requests/${id}` as Route;
}

export function adminOrderHref(id: string): Route {
  return `/admin/orders/${id}` as Route;
}

export function checkoutSuccessHref(id: string): Route {
  return `/checkout/success?id=${encodeURIComponent(id)}` as Route;
}
