import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { siteConfig } from "@/config/site";
import "./globals.css";

const sans = Geist({
  variable: "--font-body-family",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const mono = Geist_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL("https://bikesphere.local"),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink-950 font-sans text-ink-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
