import { LoginForm } from "@/features/auth/LoginForm";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextPath = typeof params.next === "string" ? params.next : "/";
  return <LoginForm nextPath={nextPath} />;
}
