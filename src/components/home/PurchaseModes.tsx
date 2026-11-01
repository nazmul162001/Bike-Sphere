import { SectionHeading } from "@/components/ui/SectionHeading";

export function PurchaseModes() {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Two desks"
          title="Individual and wholesale purchasing"
          description="The same catalog. Different quotation notes. You declare the purchase type at checkout."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <article className="rounded-md border border-ink-700 bg-ink-850 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-lime">Individual</p>
            <h3 className="mt-3 font-display text-3xl text-ink-100">Riders and one-off service</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-ink-500">
              Request a single pad set, filter, or clutch plate. The quotation is written for
              household delivery and a single motorcycle profile.
            </p>
          </article>
          <article className="rounded-md border border-ink-700 bg-ink-850 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-lime">Wholesale</p>
            <h3 className="mt-3 font-display text-3xl text-ink-100">Workshops and fleets</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-ink-500">
              Send mixed lists with quantities. The desk reviews workshop notes and applies
              wholesale terms on the quotation — never as a public catalog discount.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
