import { AuthCard } from "@/components/shared/AuthCard";

export const metadata = {
  title: "Verify email",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verify email"
      description="Email verification is simulated later. BikeSphere does not claim actual identity verification in this prototype."
    />
  );
}
