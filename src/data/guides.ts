/**
 * The launch guide set from the workbook's content plan. Each is mapped to a
 * validated question keyword. Until the articles are written, the hub links
 * to the service page that covers the same ground.
 */
export const guides = [
  { slug: "how-to-refinance-a-home-loan", title: "How to refinance a home loan in Australia", summary: "The whole process, what it costs, and how long it takes.", cluster: "Refinance", href: "/home-loans/refinance", published: false },
  { slug: "when-to-refinance", title: "When should you refinance?", summary: "The four triggers worth acting on, and when to stay put.", cluster: "Refinance", href: "/home-loans/refinance", published: false },
  { slug: "should-i-refinance", title: "Should I refinance? A broker's honest answer", summary: "Sometimes no. Here's how to tell which one you are.", cluster: "Refinance", href: "/calculators/refinance-savings", published: false },
  { slug: "refinance-cashback-offers", title: "Refinance cashback offers — what to watch for", summary: "What the cashback costs you in rate over the term.", cluster: "Refinance", href: "/home-loans/refinance", published: false },
  { slug: "self-employed-home-loans-explained", title: "Low doc and alt doc, explained", summary: "What lenders accept instead of two years of tax returns.", cluster: "Self-employed", href: "/home-loans/self-employed", published: false },
  { slug: "bank-said-no-home-loan", title: "Your bank said no. What a broker can still do", summary: "Why a decline is usually a presentation problem.", cluster: "Self-employed", href: "/home-loans/self-employed", published: false },
  { slug: "lmi-waiver-professionals", title: "LMI waivers for doctors, accountants and lawyers", summary: "Who qualifies, at what LVR, and at which lenders.", cluster: "Professionals", href: "/home-loans/doctors-medical-professionals", published: false },
  { slug: "how-much-is-lmi", title: "How much is lenders mortgage insurance?", summary: "What drives the premium, and how to avoid it entirely.", cluster: "Professionals", href: "/calculators/lmi", published: false },
  { slug: "low-doc-business-loans-explained", title: "Low doc business loans: what lenders actually need", summary: "Six months of statements often replaces full financials.", cluster: "Commercial", href: "/commercial-finance/low-doc-business-loans", published: false },
  { slug: "chattel-mortgage-vs-lease", title: "Chattel mortgage vs equipment lease", summary: "Ownership, GST and which suits your accountant's advice.", cluster: "Asset finance", href: "/asset-finance/chattel-mortgage", published: false },
  { slug: "smsf-property-loans", title: "SMSF property loans: rules, costs and criteria", summary: "What a fund needs before a lender will look at it.", cluster: "SMSF", href: "/smsf-loans", published: false },
  { slug: "how-mortgage-brokers-get-paid", title: "How brokers get paid (and why it costs you nothing)", summary: "Upfront, trail, and why the lender pays rather than you.", cluster: "Trust", href: "/credit-guide", published: false },
] as const;
