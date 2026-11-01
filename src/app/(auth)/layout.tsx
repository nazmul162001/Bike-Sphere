import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PrototypeBanner } from "@/components/layout/PrototypeBanner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <PrototypeBanner />
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <aside className="relative hidden min-h-full flex-col justify-between overflow-hidden border-r border-ink-700 bg-ink-900 px-10 py-10 lg:flex">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,255,0,0.16),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(200,255,0,0.08),transparent_36%)]" />
          <div className="relative">
            <Logo />
            <p className="mt-16 text-xs font-semibold uppercase tracking-[0.22em] text-lime">
              Bangladesh motorcycle parts
            </p>
            <h2 className="mt-4 font-display text-5xl leading-tight text-ink-100">
              Quotation desk access
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink-500">
              Sign in to request parts, review quotations, or operate the admin desk. Prices stay
              hidden until the desk writes them.
            </p>
          </div>
          <ul className="relative space-y-3 text-sm text-ink-300">
            <li className="rounded-sm border border-ink-700 bg-ink-850/70 px-4 py-3">
              user@gmail.com · password user@gmail.com
            </li>
            <li className="rounded-sm border border-ink-700 bg-ink-850/70 px-4 py-3">
              admin@gmail.com · password admin@gmail.com
            </li>
          </ul>
          <p className="relative text-xs text-ink-500">
            Prototype authentication only. No live identity check.
          </p>
        </aside>
        <section className="flex min-h-full flex-col bg-ink-850">
          <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4 lg:hidden">
            <Logo />
            <Link href="/" className="text-sm text-ink-300 hover:text-lime">
              Home
            </Link>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </section>
      </div>
    </div>
  );
}
