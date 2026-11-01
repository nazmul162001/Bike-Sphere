import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandHref } from "@/lib/utils/routes";
import type { MotorcycleBrand } from "@/types";

export function BrandGrid({ brands }: { brands: MotorcycleBrand[] }) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Manufacturers"
          title="Popular motorcycle brands"
          description="Start from the badge on the tank. Each brand page lists the models BikeSphere currently quotes against."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brandHref(brand.slug)}
              className="group rounded-md border border-ink-700 bg-ink-850 p-5 hover:border-lime/40"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-ink-500">{brand.origin}</p>
              <h3 className="mt-3 font-display text-2xl text-ink-100 group-hover:text-lime">
                {brand.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{brand.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
