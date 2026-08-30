import type { HubPage } from "@/data/types";

export const hubs: HubPage[] = [
  {
    slug: "home-loans",
    section: "home-loans",
    tier: 1,
    title: "Home Loan Broker | Independent, Australia-Wide",
    metaDescription:
      "Independent home loan brokers. Refinancing, self-employed and professional lending, investment and construction. Called back in about ten minutes. ACL 515382.",
    primaryKeyword: "home loan broker",
    eyebrow: "Home loans",
    h1: "Home loans for people the banks find complicated.",
    intro:
      "Straightforward applications go through anywhere. We're most useful when yours isn't one of them.",
    heroImage: "/brand/photography/hub-home-loans.webp",
    heroAlt: "A family outside their home",
    faqs: [
      {
        q: "What does a mortgage broker do?",
        a: "We assess your position, compare the lenders likely to approve it, structure the application, lodge it and manage it through to settlement. On the loans advertised here the lender pays us, not you.",
      },
      {
        q: "Is a broker better than going direct to a bank?",
        a: "A bank can offer its own products. A broker compares across lenders, including non-banks a branch can't access. Where your situation is unusual, that difference decides the outcome.",
      },
      {
        q: "How much does a mortgage broker cost?",
        a: "Nothing on the home loans advertised on this site — the lender pays a commission on settlement. Fees apply to private lending and some commercial deals, and you'll know before committing.",
      },
    ],
  },
  {
    slug: "commercial-finance",
    section: "commercial-finance",
    tier: 2,
    title: "Commercial Loan Broker | Business & Property Finance",
    metaDescription:
      "Commercial property, business loans, low doc facilities and working capital. Independent brokers comparing bank and non-bank lenders. ACL 515382.",
    primaryKeyword: "commercial loan broker",
    eyebrow: "Commercial finance",
    h1: "Your business banker sells one bank's products.",
    intro:
      "We compare the market — banks, non-banks and specialists — and tell you where the real difference sits.",
    heroImage: "/brand/photography/hub-commercial.webp",
    heroAlt: "A small business owner at their premises",
    faqs: [
      {
        q: "What can a commercial finance broker arrange?",
        a: "Commercial property purchases, business term loans and overdrafts, low doc facilities, working capital and invoice finance, and equipment or vehicle finance.",
      },
      {
        q: "How long has my business needed to be trading?",
        a: "Two years for most facilities, with ABN and GST registration. Some lenders consider less where there's property security.",
      },
    ],
  },
  {
    slug: "asset-finance",
    section: "asset-finance",
    tier: 2,
    title: "Asset Finance Broker | Equipment, Trucks & Machinery",
    metaDescription:
      "Asset and equipment finance for trucks, machinery, excavators and vehicles. New and used, private or dealer sale, low doc to $100,000. ACL 515382.",
    primaryKeyword: "asset finance broker",
    eyebrow: "Asset & equipment finance",
    h1: "The fastest lending we do.",
    intro:
      "Two years of ABN, GST registration and an invoice. For most established businesses that's the whole conversation.",
    heroImage: "/brand/photography/hub-asset.webp",
    heroAlt: "Heavy machinery on a work site",
    faqs: [
      {
        q: "What can be financed under asset finance?",
        a: "Trucks and trailers, excavators and earthmoving machinery, manufacturing and workshop equipment, commercial vehicles, and fit-out. Caravans and boats are excluded.",
      },
      {
        q: "How quickly can it be approved?",
        a: "Often within 24 to 48 hours for an established ABN with clean credit under a low doc application.",
      },
      {
        q: "Can I buy privately rather than from a dealer?",
        a: "Yes. Private sales are routine in this market and accepted by most asset lenders.",
      },
    ],
  },
];

export function findHub(slug: string) {
  return hubs.find((h) => h.slug === slug);
}
