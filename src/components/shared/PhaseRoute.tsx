import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function PhaseRoute({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <Container className="space-y-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl text-ink-100">{title}</h1>
          <p className="mt-4 text-base leading-7 text-ink-500">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/">Back to homepage</Button>
            <Button href="/products" variant="secondary">
              Browse parts
            </Button>
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
