import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["Brand", "Model", "Year", "Variant"];

export function BikeFinderTeaser() {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bike desk"
          title="Find parts for your bike"
          description="Select the motorcycle first. Compatible parts come after the machine is identified — not the other way around."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {steps.map((step, index) => (
            <Link
              key={step}
              href="/find-parts"
              className="rounded-md border border-ink-700 bg-ink-850 px-4 py-5 hover:border-lime/40"
            >
              <p className="font-mono text-xs text-lime">0{index + 1}</p>
              <p className="mt-3 font-display text-2xl text-ink-100">{step}</p>
              <p className="mt-2 text-sm text-ink-500">Required for a usable quotation.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
