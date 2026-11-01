"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBike, removeBike, setPrimaryBike } from "@/store/slices/bikeSlice";

export function BikeManager() {
  const bikes = useAppSelector((state) => state.bikes.bikes);
  const dispatch = useAppDispatch();
  const brands = catalogService.listBrands();
  const models = catalogService.listModels();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-ink-100">My bikes</h1>
      {bikes.length === 0 ? (
        <EmptyState title="No motorcycles saved" description="Save the bike you service so later requests stay specific." />
      ) : (
        <div className="grid gap-3">
          {bikes.map((bike) => {
            const brand = brands.find((item) => item.id === bike.brandId);
            const model = models.find((item) => item.id === bike.modelId);
            return (
              <Card key={bike.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display text-xl text-ink-100">
                    {brand?.name} {model?.name} · {bike.year}
                  </p>
                  <p className="text-sm text-ink-500">{bike.variant || "Standard"} {bike.isPrimary ? "· Primary" : ""}</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={() => dispatch(setPrimaryBike(bike.id))}>
                    Primary
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => dispatch(removeBike(bike.id))}>
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <form
        className="grid gap-3 rounded-md border border-ink-700 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          dispatch(
            addBike({
              brandId: String(data.get("brandId")),
              modelId: String(data.get("modelId")),
              year: Number(data.get("year")),
              variant: String(data.get("variant") || ""),
              nickname: String(data.get("nickname") || ""),
            }),
          );
          event.currentTarget.reset();
        }}
      >
        <Select
          name="brandId"
          label="Brand"
          options={brands.map((brand) => ({ value: brand.id, label: brand.name }))}
        />
        <Select
          name="modelId"
          label="Model"
          options={models.map((model) => ({ value: model.id, label: model.name }))}
        />
        <Input name="year" label="Year" type="number" defaultValue={2020} />
        <Input name="variant" label="Variant" />
        <Input name="nickname" label="Nickname" />
        <Button type="submit">Add motorcycle</Button>
      </form>
    </div>
  );
}
