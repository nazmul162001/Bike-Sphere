export function titleCase(value: string) {
  return value
    .split(/[\s-_]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatSku(sku: string) {
  return sku.toUpperCase();
}

export function clampText(value: string, length: number) {
  if (value.length <= length) return value;
  return `${value.slice(0, length).trimEnd()}…`;
}
