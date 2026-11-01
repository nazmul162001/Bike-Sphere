import { BadgeCheck, FileSearch, ShieldCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Classified, not guessed",
    body: "Genuine, OEM, and aftermarket labels sit on every product before you request a quote.",
    icon: BadgeCheck,
  },
  {
    title: "Quoted to market",
    body: "A person reviews the request and enters current supplier rates. The website never invents a price.",
    icon: FileSearch,
  },
  {
    title: "Delivery first",
    body: "After acceptance, only the delivery charge is collected first. The remaining amount follows delivery.",
    icon: Truck,
  },
  {
    title: "Desk accountability",
    body: "Quotations, invoices, and order status live in the same account so the paper trail is visible.",
    icon: ShieldCheck,
  },
];

export function TrustSection() {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guarantee"
          title="Authentic parts. Written quotations."
          description="BikeSphere is built as a parts desk, not a price list. Quality claims stay specific to classification, condition, and the quotation you accept."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="rounded-md border border-ink-700 bg-ink-850 p-5">
              <point.icon className="size-5 text-lime" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl text-ink-100">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
