import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/types";

export function HowItWorks({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workflow"
          title="How quotation-based purchasing works"
          description="No catalog total. No invented subtotal. The amount exists only after the desk writes it."
        />
        <ol className="mt-8 grid gap-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.id} className="rounded-md border border-ink-700 bg-ink-850 p-5">
              <p className="font-mono text-xs text-lime">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-xl text-ink-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
