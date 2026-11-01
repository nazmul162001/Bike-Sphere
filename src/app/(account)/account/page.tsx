import { AccountOverview } from "@/features/account/AccountOverview";

export const instant = false;
export const metadata = { title: "Account" };

export default function AccountPage() {
  return <AccountOverview />;
}
