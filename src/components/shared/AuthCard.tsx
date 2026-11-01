import Link from "next/link";

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-full flex-col justify-center px-6 py-10 sm:px-10">
      <p className="text-xs uppercase tracking-[0.18em] text-lime">Prototype access</p>
      <h1 className="mt-3 font-display text-3xl text-ink-100">{title}</h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-ink-500">{description}</p>
      {children}
      <p className="mt-6 text-xs text-ink-500">
        Simulated authentication only. No identity is verified.{" "}
        <Link href="/" className="text-lime hover:underline">
          Return home
        </Link>
      </p>
    </div>
  );
}
