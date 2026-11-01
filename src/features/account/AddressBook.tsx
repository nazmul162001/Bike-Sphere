"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { bangladeshLocations } from "@/lib/constants/locations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddress, removeAddress, setDefaultAddress } from "@/store/slices/addressSlice";

export function AddressBook() {
  const addresses = useAppSelector((state) => state.addresses.addresses);
  const dispatch = useAppDispatch();
  const [division, setDivision] = useState("Dhaka");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-ink-100">Addresses</h1>
      {addresses.length === 0 ? (
        <EmptyState title="No saved addresses" description="Add a Bangladesh delivery address for faster checkout." />
      ) : (
        <div className="grid gap-3">
          {addresses.map((address) => (
            <Card key={address.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
              <div>
                <p className="font-medium text-ink-100">{address.label}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {address.address}, {address.area}, {address.district}, {address.division}
                </p>
                {address.isDefault ? <p className="mt-1 text-xs text-lime">Default</p> : null}
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => dispatch(setDefaultAddress(address.id))}>
                  Default
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => dispatch(removeAddress(address.id))}>
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <form
        className="grid gap-3 rounded-md border border-ink-700 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          dispatch(
            addAddress({
              label: String(data.get("label") || "Home"),
              division: String(data.get("division")),
              district: String(data.get("district")),
              area: String(data.get("area")),
              address: String(data.get("address")),
              isDefault: addresses.length === 0,
            }),
          );
          event.currentTarget.reset();
        }}
      >
        <Input name="label" label="Label" placeholder="Home / Workshop" />
        <Select
          name="division"
          label="Division"
          value={division}
          onChange={(event) => setDivision(event.target.value)}
          options={Object.keys(bangladeshLocations).map((item) => ({ value: item, label: item }))}
        />
        <Select
          name="district"
          label="District"
          options={(bangladeshLocations[division] ?? []).map((item) => ({ value: item, label: item }))}
        />
        <Input name="area" label="Area" required />
        <div className="sm:col-span-2">
          <Input name="address" label="Full address" required />
        </div>
        <Button type="submit">Save address</Button>
      </form>
    </div>
  );
}
