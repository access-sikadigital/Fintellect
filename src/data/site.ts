/**
 * Single source of truth for site-wide facts and navigation.
 * Every figure here traces back to the Fintellect website scope document.
 */

export const site = {
  name: "Fintellect",
  legalName: "Fintellect",
  acl: "515382",
  aggregator: "SFG",
  phone: "0401 035 535",
  phoneHref: "tel:+61401035535",
  email: "hello@fintellect.com.au",
  domain: "fintellect.com.au",
  offices: ["Melbourne", "Gold Coast"],
  callbackMinutes: 10,
  fastestApprovalMinutes: 22,
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
];

export const footerNav = {
  Services: [
    { label: "Refinance", href: "/home-loans/refinance" },
    { label: "Self-employed", href: "/home-loans/self-employed" },
    { label: "Doctors & professionals", href: "/home-loans/doctors-medical-professionals" },
    { label: "Investment property", href: "/home-loans/investment-property" },
    { label: "Commercial finance", href: "/commercial-finance" },
    { label: "Asset & equipment", href: "/asset-finance" },
    { label: "SMSF lending", href: "/smsf-loans" },
  ],
  Tools: [
    { label: "Stamp duty calculator", href: "/calculators/stamp-duty" },
    { label: "Repayment calculator", href: "/calculators/home-loan-repayments" },
    { label: "Borrowing capacity", href: "/calculators/borrowing-capacity" },
    { label: "LMI calculator", href: "/calculators/lmi" },
    { label: "Refinance savings", href: "/calculators/refinance-savings" },
    { label: "All calculators", href: "/calculators" },
  ],
  Company: [
    { label: "About Fintellect", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Guides", href: "/guides" },
    { label: "Melbourne", href: "/mortgage-broker-melbourne" },
    { label: "Gold Coast", href: "/mortgage-broker-gold-coast" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Credit guide", href: "/credit-guide" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Complaints & disputes", href: "/complaints-and-disputes" },
  ],
} as const;
