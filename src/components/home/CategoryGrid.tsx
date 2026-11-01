import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryHref } from "@/lib/utils/routes";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catalog"
          title="Parts categories"
          description="Every category has its own desk identity. Prices stay off the page until a quotation is written."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={categoryHref(category.slug)}
              className="rounded-md border border-ink-700 bg-ink-850 p-4 hover:border-lime/40"
            >
              <span
                className="mb-4 block h-1 w-10"
                style={{ background: category.accent }}
              />
              <h3 className="font-display text-xl text-ink-100">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
