"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { brandHref, searchHref } from "@/lib/utils/routes";
import type { MotorcycleBrand } from "@/types";

export function HeroSearch({ brands }: { brands: MotorcycleBrand[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(searchHref(value || undefined));
  }

  return (
    <div className="mt-8 space-y-4">
      <form
        onSubmit={submit}
        className="flex flex-col gap-2 rounded-md border border-ink-700 bg-ink-900/90 p-2 sm:flex-row sm:items-center"
      >
        <label htmlFor="hero-search" className="sr-only">
          Search motorcycle parts
        </label>
        <div className="flex flex-1 items-center gap-3 px-3">
          <Search className="size-4 text-lime" />
          <input
            id="hero-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clutch plates, brake pads, oil filters, SKUs…"
            className="h-12 w-full bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
          />
        </div>
        <button
          type="submit"
          className="h-12 rounded-sm bg-lime px-5 text-sm font-semibold text-ink-950 hover:bg-lime-hover"
        >
          Find Motorcycle Parts
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {brands.slice(0, 8).map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => router.push(brandHref(brand.slug))}
            className="rounded-sm border border-ink-700 bg-ink-900 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-ink-300 hover:border-lime/40 hover:text-lime"
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}
