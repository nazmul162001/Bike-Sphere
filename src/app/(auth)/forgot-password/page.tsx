"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="border-b border-ink-700 px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Account recovery</p>
        <h1 className="mt-3 font-display text-3xl text-ink-100">Forgot password</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">
          This request is simulated. No email is sent. Demo passwords match the emails:
          user@gmail.com and admin@gmail.com.
        </p>
      </div>
      {sent ? (
        <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-8 sm:px-10">
          <p className="text-sm text-ink-300">Reset request captured in this prototype.</p>
          <Button href="/login" className="w-full">
            Back to sign in
          </Button>
        </div>
      ) : (
        <form
          className="flex flex-1 flex-col justify-center gap-4 px-6 py-8 sm:px-10"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <Input label="Email" type="email" name="email" required />
          <Button type="submit" className="w-full">
            Send reset request
          </Button>
          <Button href="/login" variant="ghost" className="w-full">
            Back to sign in
          </Button>
        </form>
      )}
    </div>
  );
}
