import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/types";

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked"
          description="The quotation model is the product. These answers stay honest about what is live in the prototype."
        />
        <Accordion
          items={faqs.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
          }))}
        />
      </div>
    </section>
  );
}
