import type { Metadata, Viewport } from "next";
import { inter, fraunces } from "@/lib/fonts";
import { ScrollToHash } from "@/components/motion/ScrollToHash";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Fintellect — Independent mortgage & finance brokers",
    template: "%s | Fintellect",
  },
  description:
    "Independent brokers who work for you, not the bank. Refinancing, self-employed and professional lending, commercial and asset finance. Most enquiries called back within about 10 minutes.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: "Fintellect — Independent mortgage & finance brokers",
    description:
      "Independent brokers who work for you, not the bank. Australian Credit Licence 515382.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#012412",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-offwhite text-forest antialiased">
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-pill focus:bg-forest focus:px-5 focus:py-3 focus:text-offwhite"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <ScrollToHash />
          <Cursor />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
