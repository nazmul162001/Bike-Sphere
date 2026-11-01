import { OrderDetail } from "@/features/account/QuotationPanels";

export const metadata = { title: "Order detail" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetail id={id} />;
}
