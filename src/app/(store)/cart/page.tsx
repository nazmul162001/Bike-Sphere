import { Container } from "@/components/ui/Container";
import { CartWorkspace } from "@/features/cart/CartWorkspace";
import { quotationCopy } from "@/lib/constants/quotation";

export const metadata = {
  title: "Request list",
};

export default function CartPage() {
  return (
    <Container className="space-y-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Cart</p>
        <h1 className="mt-2 font-display text-4xl text-ink-100">Request list</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500">{quotationCopy.cartNotice}</p>
      </div>
      <CartWorkspace />
    </Container>
  );
}
