"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { searchHref } from "@/lib/utils/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";
import { selectSearchOpen } from "@/store/selectors/ui";

export function SearchOverlay() {
  const open = useAppSelector(selectSearchOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function close() {
    dispatch(setSearchOpen(false));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = query.trim();
    close();
    router.push(searchHref(value || undefined));
  }

  return (
    <Drawer open={open} title="Search parts" onClose={close}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm text-ink-300" htmlFor="global-search">
          Search by part name, SKU, manufacturer, or bike
        </label>
        <div className="flex items-center gap-2 rounded-sm border border-ink-700 bg-ink-950 px-3">
          <Search className="size-4 text-ink-500" />
          <input
            id="global-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="R15 clutch, Pulsar chain, CBR pads"
            className="h-12 w-full bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-ink-500 hover:text-ink-100"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          className="h-11 w-full rounded-sm bg-lime text-sm font-semibold text-ink-950 hover:bg-lime-hover"
        >
          Search catalog
        </button>
        <p className="text-xs leading-5 text-ink-500">
          Search uses mock catalog data in this prototype. No live inventory lookup is performed.
        </p>
      </form>
    </Drawer>
  );
}
