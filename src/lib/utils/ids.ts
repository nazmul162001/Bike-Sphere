export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function requestId() {
  return `QR-${Date.now().toString().slice(-6)}`;
}

export function quotationId() {
  return `QT-${Date.now().toString().slice(-6)}`;
}

export function invoiceId() {
  return `INV-${Date.now().toString().slice(-6)}`;
}

export function orderId() {
  return `ORD-${Date.now().toString().slice(-6)}`;
}
