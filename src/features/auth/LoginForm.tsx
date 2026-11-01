"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Shield, UserRound } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authenticateDemo, demoPassword, demoUsers } from "@/config/demo-accounts";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/slices/authSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function LoginForm({ nextPath = "/" }: { nextPath?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const accounts = useMemo(() => Object.values(demoUsers), []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const [selectedEmail, setSelectedEmail] = useState("");

  function onSubmit(values: LoginValues) {
    const user = authenticateDemo(values.email, values.password);
    if (!user) {
      dispatch(
        pushToast({
          tone: "error",
          title: "Sign-in not available",
          description: "This prototype only signs in user@gmail.com and admin@gmail.com.",
        }),
      );
      return;
    }

    dispatch(signIn(user));
    dispatch(
      pushToast({
        tone: "success",
        title: `Signed in as ${user.role}`,
        description: user.email,
      }),
    );
    router.push((user.role === "admin" && nextPath === "/" ? "/admin" : nextPath) as Route);
  }

  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="border-b border-ink-700 px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Sign in</p>
        <h1 className="mt-3 font-display text-4xl text-ink-100">Welcome back</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">
          Use a demo account. The password is the same as the email.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-center gap-5 px-6 py-8 sm:px-10"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {accounts.map((account) => {
            const Icon = account.role === "admin" ? Shield : UserRound;
            const active = selectedEmail === account.email;
            return (
              <button
                key={account.email}
                type="button"
                onClick={() => {
                  setSelectedEmail(account.email);
                  setValue("email", account.email, { shouldValidate: true });
                  setValue("password", demoPassword(account.email), { shouldValidate: true });
                }}
                className={`rounded-md border px-4 py-4 text-left transition-colors ${
                  active
                    ? "border-lime bg-lime-dim text-ink-100"
                    : "border-ink-700 bg-ink-900 text-ink-300 hover:border-lime/40 hover:text-ink-100"
                }`}
              >
                <Icon className="size-4 text-lime" />
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-lime">{account.role}</p>
                <p className="mt-1 font-medium text-ink-100">{account.name}</p>
                <p className="mt-1 text-xs text-ink-500">{account.email}</p>
              </button>
            );
          })}
        </div>
        <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-8 right-2 grid size-8 place-items-center text-ink-500 hover:text-ink-100"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-300">
          <input type="checkbox" className="accent-lime" {...register("remember")} />
          Remember this browser
        </label>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Sign in
        </Button>
        <div className="flex justify-between text-sm">
          <Button href="/forgot-password" variant="ghost" size="sm">
            Forgot password
          </Button>
          <Button href="/signup" variant="ghost" size="sm">
            Create account
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="secondary" disabled>
            Google
          </Button>
          <Button type="button" variant="secondary" disabled>
            Facebook
          </Button>
        </div>
        <p className="text-xs text-ink-500">
          Social buttons are visual placeholders. They do not authenticate anyone.
        </p>
      </form>
    </div>
  );
}
