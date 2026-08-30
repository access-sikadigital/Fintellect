import type { ServicePage } from "@/data/types";
import { homeLoanServices } from "./home-loans";
import { commercialServices } from "./commercial";
import { assetFinanceServices } from "./asset-finance";
import { smsfServices } from "./smsf";

export const allServices: ServicePage[] = [
  ...homeLoanServices,
  ...commercialServices,
  ...assetFinanceServices,
  ...smsfServices,
];

export function servicesInSection(section: ServicePage["section"]) {
  return allServices.filter((s) => s.section === section);
}

export function findService(section: string, slug: string) {
  return allServices.find((s) => s.section === section && s.slug === slug);
}

/** Full path for a service page. SMSF is a single page at the root. */
export function servicePath(s: ServicePage) {
  return s.section === "smsf-loans" ? "/smsf-loans" : `/${s.section}/${s.slug}`;
}

export { homeLoanServices, commercialServices, assetFinanceServices, smsfServices };
