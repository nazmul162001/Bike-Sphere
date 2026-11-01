import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandHref } from "@/lib/utils/routes";
import type { MotorcycleBrand, MotorcycleModel } from "@/types";

export function ModelRail({
  models,
  brands,
}: {
  models: MotorcycleModel[];
  brands: MotorcycleBrand[];
}) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Machines"
          title="Popular motorcycle models"
          description="These platforms generate the most quotation requests from riders and workshops."
        />
        <div className="scrollbar-none mt-8 flex gap-3 overflow-x-auto pb-2">
          {models.map((model) => {
            const brand = brands.find((item) => item.id === model.brandId);
            return (
              <Link
                key={model.id}
                href={brand ? brandHref(brand.slug) : "/brands"}
                className="min-w-[240px] rounded-md border border-ink-700 bg-ink-850 p-4 hover:border-lime/40"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-lime">{brand?.name}</p>
                <h3 className="mt-3 font-display text-2xl text-ink-100">{model.name}</h3>
                <p className="mt-2 text-sm text-ink-500">
                  {model.segment} · {model.years[0]}–{model.years[model.years.length - 1]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
