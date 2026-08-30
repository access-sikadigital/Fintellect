import type { IconName } from "@/components/ui/Icon";

/** The section a page belongs to. Drives breadcrumbs and the hub it rolls up to. */
export type SectionKey =
  | "home-loans"
  | "commercial-finance"
  | "asset-finance"
  | "smsf-loans"
  | "calculators"
  | "locations"
  | "guides"
  | "core";

export type BuildTier = 1 | 2 | 3;

export type Faq = { q: string; a: string };

/**
 * A service page, modelled on the eleven-section blueprint in the website
 * scope (§7.1). Every field maps to one band of that page, so the template
 * can render a complete, compliant page from data alone.
 */
export type ServicePage = {
  /** Path segment only, e.g. "refinance". */
  slug: string;
  section: Exclude<SectionKey, "core" | "calculators" | "locations" | "guides">;
  tier: BuildTier;

  /** SEO */
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  /** Search volume / difficulty, carried through from the keyword map. */
  volume?: number;
  kd?: number;

  /** 1 — Hero. The borrower's problem, not the product name. */
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  /** Short label shown above the H1. */
  eyebrow: string;

  /** 2 — Qualifying strip. Where lead quality is won or lost. */
  qualify: {
    forThem: string[];
    notForThem: string[];
  };

  /** 3 — What you get that a bank won't. */
  advantages: { icon: IconName; title: string; body: string }[];

  /** 4 — Speed. Overrides the site default where a product differs. */
  timeline?: { label: string; value: string }[];

  /** 6 — Proof. Left empty until real case studies are captured. */
  proofNote?: string;

  /** 8 — Objection handling, on top of the site-wide three. */
  objections?: Faq[];

  /** 9 — FAQ, built from validated question keywords. */
  faqs: Faq[];

  /** 10 — Enquiry form. Selects the qualifying question set. */
  formType: "residential" | "commercial" | "asset" | "smsf" | "professional";

  /** Internal linking. Slugs of sibling pages. */
  related: string[];
};

export type HubPage = {
  slug: string;
  section: SectionKey;
  tier: BuildTier;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  faqs: Faq[];
};

export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  tier: BuildTier;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  volume?: number;
  kd?: number;
  h1: string;
  intro: string;
  /** True where Fintellect has a physical office. */
  office: boolean;
  suburbs: string[];
  faqs: Faq[];
};

export type CalculatorPage = {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  volume?: number;
  kd?: number;
  tier: BuildTier;
  h1: string;
  intro: string;
  /** Which engine the page mounts. */
  kind:
    | "stamp-duty"
    | "repayments"
    | "borrowing"
    | "lmi"
    | "offset"
    | "extra-repayments"
    | "refinance-savings";
  /** State code for the per-state stamp duty pages. */
  state?: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
  /** Server-rendered supporting copy — required for these pages to rank. */
  explainer: { heading: string; body: string }[];
  faqs: Faq[];
  /** Where the result routes the visitor next. */
  nextStep: { label: string; href: string };
};

export type LandingPage = {
  slug: string;
  title: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  bullets: string[];
  formType: ServicePage["formType"];
};
