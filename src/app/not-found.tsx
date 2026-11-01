import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink-100">This route is not on the desk.</h1>
      <p className="mt-4 max-w-lg text-ink-500">
        The page does not exist in the BikeSphere prototype. Return to the catalog or the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Homepage</Button>
        <Button href="/products" variant="secondary">
          Parts catalog
        </Button>
      </div>
    </Container>
  );
}
