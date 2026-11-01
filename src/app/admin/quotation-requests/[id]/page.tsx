import { QuotationRequestEditor } from "@/features/admin/QuotationDesk";

export const metadata = { title: "Quotation request" };

export default async function AdminQuotationRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuotationRequestEditor id={id} />;
}
