"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/store/slices/authSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function ProfileForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [preview, setPreview] = useState(user?.avatarDataUrl ?? "");

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(updateProfile({ name, phone, avatarDataUrl: preview }));
        dispatch(pushToast({ tone: "success", title: "Profile updated in this browser" }));
      }}
    >
      <h1 className="font-display text-3xl text-ink-100">Profile</h1>
      <p className="text-sm text-ink-500">Changes stay in local prototype state.</p>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="size-20 rounded-sm object-cover" />
      ) : null}
      <Input
        label="Profile image"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => setPreview(String(reader.result));
          reader.readAsDataURL(file);
        }}
      />
      <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
      <Input label="Email" value={user?.email ?? ""} readOnly />
      <Input label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <Button type="submit">Save profile</Button>
    </form>
  );
}
