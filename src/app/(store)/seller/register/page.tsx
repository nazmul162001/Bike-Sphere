import { PhaseRoute } from "@/components/shared/PhaseRoute";

export const metadata = {
  title: "Seller registration",
};

export default function SellerRegisterPage() {
  return (
    <PhaseRoute
      eyebrow="Seller"
      title="Register a seller desk"
      description="The registration form and listing fields will be built in Phase 6 using React Hook Form and Zod. No payouts or live seller accounts exist in this prototype."
    />
  );
}
