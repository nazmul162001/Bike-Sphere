import type { Route } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/lib/constants/navigation";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: Route }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-ink-300 hover:text-lime">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-500">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-ink-300">
            Desk hours: {siteConfig.contact.hours}
          </p>
          <p className="mt-2 text-sm text-ink-500">{siteConfig.contact.email}</p>
        </div>
        <FooterColumn title="Shop" items={footerNav.shop} />
        <FooterColumn title="Account" items={footerNav.account} />
        <FooterColumn title="Marketplace" items={footerNav.marketplace} />
        <FooterColumn title="Desk" items={footerNav.company} />
      </div>
      <div className="border-t border-ink-700">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-5 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 BikeSphere. Quotation-first parts desk for {siteConfig.country}.</p>
          <p>{siteConfig.serviceAreas.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
