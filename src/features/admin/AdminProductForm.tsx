"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { slugify } from "@/lib/utils/ids";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/slices/catalogSlice";
import { pushToast } from "@/store/slices/uiSlice";
import type { AvailabilityStatus, PartClassification, PartCondition } from "@/types";

export function AdminProductForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, brands, models } = useMergedCatalog();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [classification, setClassification] = useState<PartClassification>("genuine");
  const [condition, setCondition] = useState<PartCondition>("new");
  const [availability, setAvailability] = useState<AvailabilityStatus>("in_stock");
  const [brandFilter, setBrandFilter] = useState("");
  const [compatibleModelIds, setCompatibleModelIds] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const visibleModels = useMemo(
    () => (brandFilter ? models.filter((model) => model.brandId === brandFilter) : models),
    [brandFilter, models],
  );

  function toggleModel(id: string) {
    setCompatibleModelIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <Card className="space-y-5 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-lime">Catalog</p>
        <h1 className="mt-2 font-display text-3xl text-ink-100">New product</h1>
        <p className="mt-2 text-sm text-ink-500">
          Choose category, bike models, and other filter fields so this part can be found later.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Product name" value={name} onChange={(event) => setName(event.target.value)} />
        <Input label="SKU" value={sku} onChange={(event) => setSku(event.target.value)} />
        <Input
          label="Part number"
          value={partNumber}
          onChange={(event) => setPartNumber(event.target.value)}
        />
        <Input
          label="Manufacturer"
          value={manufacturer}
          onChange={(event) => setManufacturer(event.target.value)}
        />
        <Select
          label="Category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
        <Select
          label="Classification"
          value={classification}
          onChange={(event) => setClassification(event.target.value as PartClassification)}
          options={[
            { value: "genuine", label: "Genuine" },
            { value: "oem", label: "OEM" },
            { value: "aftermarket", label: "Aftermarket" },
          ]}
        />
        <Select
          label="Condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value as PartCondition)}
          options={[
            { value: "new", label: "New" },
            { value: "used", label: "Used" },
          ]}
        />
        <Select
          label="Availability"
          value={availability}
          onChange={(event) => setAvailability(event.target.value as AvailabilityStatus)}
          options={[
            { value: "in_stock", label: "In stock" },
            { value: "limited", label: "Limited" },
            { value: "made_to_order", label: "Made to order" },
            { value: "out_of_stock", label: "Out of stock" },
          ]}
        />
      </div>
      <div className="space-y-3">
        <Select
          label="Filter models by brand"
          value={brandFilter}
          onChange={(event) => setBrandFilter(event.target.value)}
          options={[
            { value: "", label: "All brands" },
            ...brands.map((brand) => ({ value: brand.id, label: brand.name })),
          ]}
        />
        <p className="text-sm font-medium text-ink-100">Compatible bike models</p>
        <p className="text-xs text-ink-500">
          Select every motorcycle this part fits. These IDs drive brand, model, and find-parts filters.
        </p>
        <div className="grid max-h-64 gap-2 overflow-y-auto rounded-sm border border-ink-700 p-3 sm:grid-cols-2">
          {visibleModels.map((model) => {
            const brand = brands.find((item) => item.id === model.brandId);
            const checked = compatibleModelIds.includes(model.id);
            return (
              <label key={model.id} className="flex cursor-pointer items-start gap-2 text-sm text-ink-300">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-lime"
                  checked={checked}
                  onChange={() => toggleModel(model.id)}
                />
                <span>
                  <span className="text-ink-100">{model.name}</span>
                  <span className="block text-xs text-ink-500">
                    {brand?.name} · {model.segment} · {model.years[0]}–{model.years[model.years.length - 1]}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-lime">{compatibleModelIds.length} model{compatibleModelIds.length === 1 ? "" : "s"} selected</p>
      </div>
      <Textarea
        label="Short description"
        value={shortDescription}
        onChange={(event) => setShortDescription(event.target.value)}
      />
      <Textarea
        label="Full description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        label="Tags"
        hint="Comma-separated keywords used by search and filters"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
      />
      <div className="flex flex-wrap gap-4 text-sm text-ink-300">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="accent-lime" checked={isFeatured} onChange={(event) => setIsFeatured(event.target.checked)} />
          Featured
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="accent-lime" checked={isNew} onChange={(event) => setIsNew(event.target.checked)} />
          Newly added
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="accent-lime" checked={isBestSeller} onChange={(event) => setIsBestSeller(event.target.checked)} />
          Best seller
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => {
            if (name.trim().length < 2 || !categoryId) {
              dispatch(pushToast({ tone: "error", title: "Name and category are required" }));
              return;
            }
            dispatch(
              addProduct({
                name: name.trim(),
                sku: sku.trim() || `BS-${slugify(name).slice(0, 12).toUpperCase()}`,
                partNumber: partNumber.trim() || "TBD",
                manufacturer: manufacturer.trim() || "Unspecified",
                categoryId,
                classification,
                condition,
                availability,
                shortDescription: shortDescription.trim() || "Price on request. Fitment is limited to selected models.",
                description:
                  description.trim() ||
                  "Admin-added catalog part. No public price. Compatibility follows the selected motorcycle models.",
                specifications: [
                  { label: "Condition", value: condition },
                  { label: "Classification", value: classification },
                ],
                compatibleModelIds,
                isFeatured,
                isNew,
                isBestSeller,
                tags: tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
                slug: slugify(name),
              }),
            );
            dispatch(pushToast({ tone: "success", title: "Product added", description: name.trim() }));
            router.push("/admin/products");
          }}
        >
          Save product
        </Button>
        <Button href="/admin/products" variant="secondary">
          Cancel
        </Button>
      </div>
    </Card>
  );
}
