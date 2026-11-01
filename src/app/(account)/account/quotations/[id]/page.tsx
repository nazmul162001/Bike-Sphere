import { QuotationDetail } from "@/features/account/QuotationPanels";

export const metadata = { title: "Quotation detail" };

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuotationDetail id={id} />;
}
