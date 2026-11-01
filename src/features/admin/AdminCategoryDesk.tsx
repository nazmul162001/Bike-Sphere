"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CatalogTable } from "@/features/admin/AdminCollections";
import { slugify } from "@/lib/utils/ids";
import { useMergedCatalog } from "@/store/hooks/useMergedCatalog";
import { useAppDispatch } from "@/store/hooks";
import { addCategory } from "@/store/slices/catalogSlice";
import { pushToast } from "@/store/slices/uiSlice";

const accents = ["#C8FF00", "#FF5A3C", "#7AD4FF", "#F5C542", "#4ADE80", "#A7B0B8", "#60A5FA"];

export function AdminCategoryDesk() {
  const dispatch = useAppDispatch();
  const { categories } = useMergedCatalog();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accent, setAccent] = useState(accents[0]);

  return (
    <div className="space-y-8">
      <Card className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-lime">Catalog</p>
          <h1 className="mt-2 font-display text-3xl text-ink-100">Add category</h1>
          <p className="mt-2 text-sm text-ink-500">
            New categories stay in this browser and can be selected when adding products.
          </p>
        </div>
        <Input label="Category name" value={name} onChange={(event) => setName(event.target.value)} />
        <Textarea
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div>
          <p className="mb-2 text-sm font-medium text-ink-100">Accent</p>
          <div className="flex flex-wrap gap-2">
            {accents.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Accent ${color}`}
                onClick={() => setAccent(color)}
                className={`size-8 rounded-sm border ${accent === color ? "border-lime" : "border-ink-700"}`}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
        <Button
          type="button"
          onClick={() => {
            if (name.trim().length < 2) {
              dispatch(pushToast({ tone: "error", title: "Enter a category name" }));
              return;
            }
            dispatch(
              addCategory({
                name: name.trim(),
                description: description.trim() || "Admin-added category for quotation catalog.",
                accent,
                slug: slugify(name),
              }),
            );
            dispatch(pushToast({ tone: "success", title: "Category added", description: name.trim() }));
            setName("");
            setDescription("");
          }}
        >
          Add category
        </Button>
      </Card>
      <CatalogTable
        title="Categories"
        rows={categories.map((item) => ({
          id: item.slug,
          primary: item.name,
          secondary: item.description,
        }))}
      />
    </div>
  );
}
