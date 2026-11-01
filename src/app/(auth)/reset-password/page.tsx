import { AuthCard } from "@/components/shared/AuthCard";

export const metadata = {
  title: "Reset password",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset password"
      description="Tokenized reset is not implemented. This screen exists so the auth route map is complete."
    />
  );
}
