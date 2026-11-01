import { Container } from "@/components/ui/Container";
import { CheckoutSuccess } from "@/features/checkout/CheckoutSuccess";

export const metadata = {
  title: "Request submitted",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string | string[] }>;
}) {
  const params = await searchParams;
  const id = typeof params.id === "string" ? params.id : "QR-draft";
  return (
    <Container className="py-16">
      <CheckoutSuccess requestId={id} />
    </Container>
  );
}
