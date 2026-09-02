/**
 * Single source of truth for site-wide facts and navigation.
 * Every figure here traces back to the Fintellect website scope document.
 */

export const site = {
  name: "Fintellect",
  legalName: "Fintellect",
  acl: "515382",
  aggregator: "SFG",
  /**
   * ⚠ DISPLAY AND DIAL NUMBERS DIFFER — supplied this way by John, 2 Sep 2026.
   *
   * The site shows 1300 366 639; the click-to-call dials 03 9386 3011.
   *
   * This is the exact discrepancy the website scope flagged under "Items to
   * confirm" ("the number displayed in the current header and the number
   * behind the click-to-call link differ"). It is implemented as instructed,
   * but worth confirming it is deliberate — a 1300 line pointing at a
   * landline is usually either a call-tracking arrangement or a leftover
   * mistake, and it needs settling before call tracking is configured.
   */
  phone: "1300 366 639",
  phoneHref: "tel:0393863011",
  email: "hello@fintellect.com.au",
  domain: "fintellect.com.au",
  offices: ["Melbourne", "Gold Coast"],
  callbackMinutes: 10,
  fastestApprovalMinutes: 22,

  /**
   * FIN-12 — the single primary action, defined once.
   *
   * The site previously ran four competing primaries: "Get your free loan
   * health check", "Free loan health check", "Start your assessment" and
   * "Check if we can help". Everything primary now reads from here, so the
   * wording can only be changed in one place.
   *
   * Approved by John, 31 August 2026. Changed to "Get your free assessment"
   * on 2 September — a loan health check does not describe commercial,
   * asset or SMSF enquiries, and this does.
   */
  cta: {
    primary: "Get your free assessment",
    /** For tight spaces — the header bar. */
    short: "Free assessment",
    href: "/contact",
  },
} as const;

export type NavChild = { label: string; href: string; note?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Home loans",
    href: "/home-loans",
    children: [
      { label: "Refinance", href: "/home-loans/refinance", note: "Our largest product" },
      { label: "Self-employed", href: "/home-loans/self-employed", note: "Low doc and alt doc" },
      { label: "Doctors & medical", href: "/home-loans/doctors-medical-professionals", note: "Up to 95%, no LMI" },
      { label: "Accountants & lawyers", href: "/home-loans/accountants-lawyers" },
      { label: "Investment property", href: "/home-loans/investment-property" },
      { label: "Construction", href: "/home-loans/construction" },
      { label: "Bridging finance", href: "/home-loans/bridging-finance" },
      { label: "Debt consolidation", href: "/home-loans/debt-consolidation" },
    ],
  },
  {
    label: "Commercial",
    href: "/commercial-finance",
    children: [
      { label: "Commercial property", href: "/commercial-finance/commercial-property-loans" },
      { label: "Business loans", href: "/commercial-finance/business-loans" },
      { label: "Low doc business loans", href: "/commercial-finance/low-doc-business-loans" },
      { label: "Working capital", href: "/commercial-finance/working-capital-cashflow" },
    ],
  },
  {
    label: "Asset finance",
    href: "/asset-finance",
    children: [
      { label: "Equipment finance", href: "/asset-finance/equipment-finance" },
      { label: "Truck finance", href: "/asset-finance/truck-finance" },
      { label: "Machinery & excavator", href: "/asset-finance/machinery-excavator" },
      { label: "Vehicle finance", href: "/asset-finance/vehicle-finance" },
      { label: "Chattel mortgage", href: "/asset-finance/chattel-mortgage" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "Stamp duty", href: "/calculators/stamp-duty" },
      { label: "Repayments", href: "/calculators/home-loan-repayments" },
      { label: "Borrowing capacity", href: "/calculators/borrowing-capacity" },
      { label: "LMI", href: "/calculators/lmi" },
      { label: "Refinance savings", href: "/calculators/refinance-savings" },
      { label: "Offset account", href: "/calculators/offset-account" },
    ],
  },
  { label: "About", href: "/about" },
  // John, 2 Sep: "there's no contact in the header menu — let's just put a
  // contact button there." Reviews stays in the footer only.
  { label: "Contact", href: "/contact" },
];

/**
 * FIN-13 — the footer mirrors the header exactly. Every link in `nav` above
 * has a home here, so a menu change in one place cannot silently drift from
 * the other. Verified by scripts/check-nav-parity.mjs.
 */
export const footerNav = {
  "Home loans": [
    { label: "All home loans", href: "/home-loans" },
    { label: "Refinance", href: "/home-loans/refinance" },
    { label: "Self-employed", href: "/home-loans/self-employed" },
    { label: "Doctors & medical", href: "/home-loans/doctors-medical-professionals" },
    { label: "Accountants & lawyers", href: "/home-loans/accountants-lawyers" },
    { label: "Investment property", href: "/home-loans/investment-property" },
    { label: "Construction", href: "/home-loans/construction" },
    { label: "Bridging finance", href: "/home-loans/bridging-finance" },
    { label: "Debt consolidation", href: "/home-loans/debt-consolidation" },
  ],
  Commercial: [
    { label: "All commercial", href: "/commercial-finance" },
    { label: "Commercial property", href: "/commercial-finance/commercial-property-loans" },
    { label: "Business loans", href: "/commercial-finance/business-loans" },
    { label: "Low doc business", href: "/commercial-finance/low-doc-business-loans" },
    { label: "Working capital", href: "/commercial-finance/working-capital-cashflow" },
    { label: "SMSF lending", href: "/smsf-loans" },
  ],
  "Asset finance": [
    { label: "All asset finance", href: "/asset-finance" },
    { label: "Equipment finance", href: "/asset-finance/equipment-finance" },
    { label: "Truck finance", href: "/asset-finance/truck-finance" },
    { label: "Machinery & excavator", href: "/asset-finance/machinery-excavator" },
    { label: "Vehicle finance", href: "/asset-finance/vehicle-finance" },
    { label: "Chattel mortgage", href: "/asset-finance/chattel-mortgage" },
  ],
  Calculators: [
    { label: "All calculators", href: "/calculators" },
    { label: "Stamp duty", href: "/calculators/stamp-duty" },
    { label: "Repayments", href: "/calculators/home-loan-repayments" },
    { label: "Borrowing capacity", href: "/calculators/borrowing-capacity" },
    { label: "LMI", href: "/calculators/lmi" },
    { label: "Refinance savings", href: "/calculators/refinance-savings" },
    { label: "Offset account", href: "/calculators/offset-account" },
  ],
  Company: [
    { label: "About Fintellect", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Guides", href: "/guides" },
    { label: "Melbourne", href: "/mortgage-broker-melbourne" },
    { label: "Sydney", href: "/mortgage-broker-sydney" },
    { label: "Brisbane", href: "/mortgage-broker-brisbane" },
    { label: "Perth", href: "/mortgage-broker-perth" },
    { label: "Gold Coast", href: "/mortgage-broker-gold-coast" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Credit guide", href: "/credit-guide" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Complaints & disputes", href: "/complaints-and-disputes" },
  ],
} as const;
