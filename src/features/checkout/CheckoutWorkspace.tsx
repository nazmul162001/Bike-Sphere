"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { EmptyState } from "@/components/ui/EmptyState";
import { bangladeshLocations, deliveryPreferences } from "@/lib/constants/locations";
import { checkoutSchema, type CheckoutValues } from "@/lib/validations/checkout";
import { checkoutSuccessHref } from "@/lib/utils/routes";
import { requestId } from "@/lib/utils/ids";
import { catalogService } from "@/services/adapters/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors/cart";
import { clearCart } from "@/store/slices/cartSlice";
import { addRequest } from "@/store/slices/quotationSlice";
import { addNotification } from "@/store/slices/notificationSlice";
import { pushToast } from "@/store/slices/uiSlice";

const steps = ["Contact", "Delivery", "Preferences", "Review"] as const;

export function CheckoutWorkspace() {
  const items = useAppSelector(selectCartItems);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const products = catalogService.listProducts();

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      whatsapp: user?.phone ?? "",
      division: "Dhaka",
      district: "Dhaka",
      area: "",
      address: "",
      deliveryInstructions: "",
      purchaseType: "individual",
      deliveryPreference: deliveryPreferences[0],
      notes: "",
    },
  });

  const division = form.watch("division");
  const districts = useMemo(
    () => bangladeshLocations[division] ?? bangladeshLocations.Dhaka,
    [division],
  );

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing to quote"
        description="Add parts to the request list before checkout."
        action={<Button href="/cart">Open request list</Button>}
      />
    );
  }

  async function submit(values: CheckoutValues) {
    const id = requestId();
    dispatch(
      addRequest({
        id,
        customerName: values.fullName,
        email: values.email,
        phone: values.phone,
        whatsapp: values.whatsapp,
        division: values.division,
        district: values.district,
        area: values.area,
        address: values.address,
        deliveryInstructions: values.deliveryInstructions,
        deliveryPreference: values.deliveryPreference,
        purchaseType: values.purchaseType,
        notes: values.notes,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        status: "awaiting_quotation",
        createdAt: new Date().toISOString(),
      }),
    );
    dispatch(clearCart());
    dispatch(
      addNotification({
        title: "Quotation request submitted",
        body: `${id} is awaiting a desk quotation.`,
      }),
    );
    dispatch(
      pushToast({
        tone: "success",
        title: "Request submitted",
        description: id,
      }),
    );
    router.push(checkoutSuccessHref(id));
  }

  const values = form.getValues();

  return (
    <div className="space-y-6">
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`rounded-sm border px-3 py-2 text-sm ${
              index === step ? "border-lime text-lime" : "border-ink-700 text-ink-500"
            }`}
          >
            0{index + 1} {label}
          </li>
        ))}
      </ol>

      <form onSubmit={form.handleSubmit(submit)} className="space-y-5 rounded-md border border-ink-700 bg-ink-850 p-5">
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" error={form.formState.errors.fullName?.message} {...form.register("fullName")} />
            <Input label="Email" type="email" error={form.formState.errors.email?.message} {...form.register("email")} />
            <Input label="Phone" error={form.formState.errors.phone?.message} {...form.register("phone")} />
            <Input label="WhatsApp number" {...form.register("whatsapp")} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Division"
              options={Object.keys(bangladeshLocations).map((item) => ({ value: item, label: item }))}
              error={form.formState.errors.division?.message}
              {...form.register("division")}
            />
            <Select
              label="District"
              options={districts.map((item) => ({ value: item, label: item }))}
              error={form.formState.errors.district?.message}
              {...form.register("district")}
            />
            <Input label="Area" error={form.formState.errors.area?.message} {...form.register("area")} />
            <Input label="Full address" error={form.formState.errors.address?.message} {...form.register("address")} />
            <div className="sm:col-span-2">
              <Textarea label="Delivery instructions" {...form.register("deliveryInstructions")} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <Select
              label="Purchase type"
              options={[
                { value: "individual", label: "Individual" },
                { value: "wholesale", label: "Wholesale" },
              ]}
              {...form.register("purchaseType")}
            />
            <Select
              label="Delivery preference"
              options={deliveryPreferences.map((item) => ({ value: item, label: item }))}
              {...form.register("deliveryPreference")}
            />
            <Textarea label="Additional notes" {...form.register("notes")} />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4 text-sm text-ink-300">
            <p>
              {values.fullName} · {values.email} · {values.phone}
            </p>
            <p>
              {values.address}, {values.area}, {values.district}, {values.division}
            </p>
            <p>
              {values.purchaseType} · {values.deliveryPreference}
            </p>
            <ul className="space-y-2">
              {items.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                return (
                  <li key={item.productId} className="flex justify-between border-b border-ink-700 py-2">
                    <span>{product?.name ?? item.productId}</span>
                    <span>Qty {item.quantity}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-lime">Awaiting Quotation — no amount is due on this screen.</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={() => setStep((value) => value - 1)}>
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              type="button"
              onClick={async () => {
                const fields: Array<keyof CheckoutValues> =
                  step === 0
                    ? ["fullName", "email", "phone"]
                    : step === 1
                      ? ["division", "district", "area", "address"]
                      : ["purchaseType", "deliveryPreference"];
                const valid = await form.trigger(fields);
                if (valid) setStep((value) => value + 1);
              }}
            >
              Continue
            </Button>
          ) : (
            <Button type="submit">Submit quotation request</Button>
          )}
        </div>
      </form>
    </div>
  );
}
