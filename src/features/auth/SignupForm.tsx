"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signupSchema, type SignupValues } from "@/lib/validations/auth";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/uiSlice";

export function SignupForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit(values: SignupValues) {
    setConfirmed(true);
    dispatch(
      pushToast({
        tone: "success",
        title: "Signup request captured",
        description: `${values.name}, this form does not create a login. Use user@gmail.com or admin@gmail.com to sign in.`,
      }),
    );
    window.setTimeout(() => router.push("/"), 1800);
  }

  if (confirmed) {
    return (
      <div className="flex h-full min-h-full flex-col items-center justify-center px-8 py-10 text-center">
        <CheckCircle2 className="size-10 text-lime" />
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-lime">Confirmation</p>
        <h1 className="mt-3 font-display text-3xl text-ink-100">Details received</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-ink-500">
          The signup form is a prototype walkthrough. No account was created and no email was sent.
          Redirecting home. Sign in with the two demo emails when you want a working session.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="border-b border-ink-700 px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Demo signup</p>
        <h1 className="mt-3 font-display text-4xl text-ink-100">Create an account</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">
          Submit the form to see the confirmation path. Login still only works for user@gmail.com
          and admin@gmail.com. Password for each is the same as the email.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-center gap-4 px-6 py-8 sm:px-10"
      >
        <Input label="Full name" error={errors.name?.message} {...register("name")} />
        <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
        <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirm password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <label className="flex items-start gap-2 text-sm text-ink-300">
          <input type="checkbox" className="mt-1 accent-lime" {...register("terms")} />
          I understand this is a frontend prototype and not a live identity check.
        </label>
        {errors.terms ? <p className="text-xs text-error">{errors.terms.message}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Sign up
        </Button>
        <Button href="/login" variant="ghost" className="w-full">
          Already have a demo login
        </Button>
      </form>
    </div>
  );
}
