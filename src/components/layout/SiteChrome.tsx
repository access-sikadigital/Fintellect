"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Paid landing pages deliberately carry no site navigation — every exit
 * other than the enquiry form is a leak on traffic you paid for. They render
 * their own minimal header instead.
 */
function isLanding(pathname: string | null) {
  return Boolean(pathname?.startsWith("/lp/"));
}

export function SiteHeader() {
  return isLanding(usePathname()) ? null : <Header />;
}

export function SiteFooter() {
  return isLanding(usePathname()) ? null : <Footer />;
}
