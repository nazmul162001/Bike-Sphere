import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SellerPromo() {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-md border border-ink-700 bg-ink-850 px-6 py-10 lg:grid-cols-[1.3fr_0.7fr] lg:px-10">
          <SectionHeading
            eyebrow="Marketplace"
            title="List parts from your workshop or import desk"
            description="Sellers can publish mock listings in this prototype. There are no payouts, commissions, or live inventory transfers yet — the registration and listing UI is being built to accept a real backend later."
          />
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href="/sell">Start selling</Button>
            <Button href="/seller/register" variant="secondary">
              Seller registration
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
