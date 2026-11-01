import { Card } from "@/components/ui/Card";

export const metadata = { title: "Admin settings" };

export default function Page() {
  return (
    <Card className="p-5">
      <h1 className="font-display text-3xl">Admin settings</h1>
      <p className="mt-3 text-sm text-ink-500">
        This desk is not secured. Anyone who signs in with admin@gmail.com / admin@gmail.com can
        open it in this browser. No live payments or identity checks run here.
      </p>
    </Card>
  );
}
