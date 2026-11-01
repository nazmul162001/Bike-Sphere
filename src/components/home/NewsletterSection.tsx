"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { newsletterSchema, type NewsletterValues } from "@/lib/validations/newsletter";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

export function NewsletterSection() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  function onSubmit() {
    dispatch(
      pushToast({
        tone: "info",
        title: "Prototype subscription captured",
        description: "No email service is connected. This only validates the form.",
      }),
    );
    reset();
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 rounded-md border border-ink-700 bg-ink-850 px-6 py-8 lg:grid-cols-[1fr_420px] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
              Desk notes
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink-100">
              Restock and quotation process updates
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-500">
              This form is a frontend prototype. Submitting an address does not create a mailing
              list membership or send messages.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                label="Email"
                type="email"
                placeholder="you@workshop.bd"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <Button type="submit" className="sm:mb-[2px]">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
