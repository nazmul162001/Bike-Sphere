import { Container } from "@/components/ui/Container";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { CheckoutWorkspace } from "@/features/checkout/CheckoutWorkspace";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <Container className="space-y-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Checkout</p>
        <h1 className="mt-2 font-display text-4xl text-ink-100">Submit a quotation request</h1>
      </div>
      <RequireAuth nextPath="/checkout">
        <CheckoutWorkspace />
      </RequireAuth>
    </Container>
  );
}
