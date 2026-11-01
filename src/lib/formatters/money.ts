export function formatBdt(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function quotationTotal(input: {
  items: { quantity: number; unitPriceBdt: number }[];
  deliveryChargeBdt: number;
  discountBdt: number;
}) {
  const parts = input.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceBdt,
    0,
  );
  return Math.max(0, parts + input.deliveryChargeBdt - input.discountBdt);
}
