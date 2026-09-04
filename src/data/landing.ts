import type { LandingPage } from "@/data/types";

/**
 * Paid-traffic landing pages. Noindex by design (scope §6) so they never
 * compete with the SEO pages targeting the same terms.
 */
export const landingPages: LandingPage[] = [
  {
    slug: "refinance",
    heroImage: "/brand/photography/lp-refinance.webp",
    title: "Refinance Your Home Loan | Free Loan Health Check",
    h1: "Find out if your rate is still competitive.",
    intro: "A free loan health check. We compare what you're on to what you could be on, and tell you straight whether moving is worth it.",
    heroAlt: "A couple reviewing their loan at the kitchen table",
    bullets: [
      "We price the whole move — discharge, application and valuation fees, not just the rate",
      "If your current loan is already competitive, we'll tell you to stay",
      "No fee to you. The lender pays us on settlement",
      "Called back within about ten minutes in business hours",
    ],
    formType: "residential",
  },
  {
    slug: "self-employed-home-loans",
    heroImage: "/brand/photography/lp-self-employed.webp",
    title: "Self-Employed Home Loans | Low Doc & Alt Doc",
    h1: "Self-employed and the bank said no?",
    intro: "Alt doc lenders read your numbers differently. Twelve months of trading is often enough.",
    heroAlt: "A self-employed tradesperson at work",
    bullets: [
      "BAS, bank statements or an accountant's letter instead of two years of returns",
      "We add back depreciation and one-off expenses your accountant deducted",
      "Specialist lenders the major banks don't compete with",
      "A decline elsewhere is usually a presentation problem, not a capacity one",
    ],
    formType: "residential",
  },
  {
    slug: "doctors-home-loans",
    heroImage: "/brand/photography/lp-doctors.webp",
    title: "Home Loans for Doctors | Up to 95% No LMI",
    h1: "Borrow up to 95% with no LMI.",
    intro: "The major banks waive lenders mortgage insurance for medical professionals. On a $900,000 purchase that's tens of thousands of dollars.",
    heroAlt: "A medical professional in natural light",
    bullets: [
      "Specialists, GPs, registrars and residents all qualify at some lenders",
      "Approved occupation lists and LVR caps differ at every bank — we know which is which",
      "Practice and equipment finance alongside the home loan",
      "Built around your roster, not banking hours",
    ],
    formType: "professional",
  },
  {
    slug: "equipment-finance",
    heroImage: "/brand/photography/lp-equipment.webp",
    title: "Equipment Finance | Approval in 24–48 Hours",
    h1: "The gear has to be on site next week.",
    intro: "Two years of ABN, GST registration and the invoice. For most established businesses that's the whole conversation.",
    heroAlt: "Heavy equipment on a work site",
    bullets: [
      "Low doc approvals often back within 24 to 48 hours",
      "New or used, private sale or dealer",
      "Low doc comfortable to $100,000",
      "Chattel mortgage or lease — structured to suit your accountant",
    ],
    formType: "asset",
  },
  {
    slug: "commercial-business-loans",
    heroImage: "/brand/photography/lp-commercial.webp",
    title: "Business Loans | Bank & Non-Bank Compared",
    h1: "Your bank knows one product.",
    intro: "We compare secured and unsecured term loans, overdrafts and cashflow facilities across the market.",
    heroAlt: "A small business owner reviewing accounts",
    bullets: [
      "Low doc options on bank statements and BAS — no full financials needed",
      "Bank and non-bank in one comparison",
      "One application, presented to the lenders most likely to approve it",
      "Cashflow, equipment, property or acquisition",
    ],
    formType: "commercial",
  },
];

export function findLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
