import { siteConfig } from "@/config/site";

export function PrototypeBanner() {
  return (
    <div className="border-b border-ink-700 bg-ink-900">
      <p className="mx-auto max-w-[1280px] px-4 py-2 text-center text-[11px] leading-5 tracking-wide text-ink-500 sm:px-6 lg:px-8">
        {siteConfig.prototypeNotice}
      </p>
    </div>
  );
}
