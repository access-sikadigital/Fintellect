import type { ServicePage } from "@/data/types";

export const smsfServices: ServicePage[] = [
  {
    slug: "smsf-loans",
    section: "smsf-loans",
    tier: 2,
    title: "SMSF Loans | Property Lending for Self-Managed Super",
    metaDescription:
      "Limited recourse borrowing for established self-managed super funds. Minimum $300,000 balance, accountant or adviser involved. ACL 515382.",
    primaryKeyword: "smsf lending",
    volume: 1000,
    kd: 28,
    eyebrow: "SMSF lending",
    h1: "Your fund can borrow. Within limits.",
    intro:
      "Limited recourse borrowing lets an established SMSF buy property. The rules are strict, the lender list is short, and getting the structure wrong is expensive to unwind.",
    heroImage: "/brand/photography/svc-smsf.webp",
    heroAlt: "A couple reviewing investment documents",
    qualify: {
      forThem: [
        "Fund already established",
        "Minimum $300,000 balance, or an existing property",
        "Accountant or adviser already involved",
        "Residential or commercial property",
      ],
      notForThem: [
        "Funds under $200,000",
        "Fund setup — we refer that to your accountant",
        "Funds without professional advice in place",
      ],
    },
    advantages: [
      {
        icon: "bank",
        title: "A short lender list, known well",
        body: "Most majors exited SMSF lending. The remaining lenders have specific requirements, and knowing them before you sign a contract matters.",
      },
      {
        icon: "note-01",
        title: "Structure checked before contract",
        body: "The bare trust and the contract have to be right at the outset. Fixing it afterwards can trigger duty a second time.",
      },
      {
        icon: "user-group",
        title: "We work to your adviser",
        body: "Whether borrowing suits your fund is their decision. We arrange the finance once they've made it.",
      },
      {
        icon: "check",
        title: "Business premises included",
        body: "Buying your own business premises through the fund is one of the more common SMSF purchases and has its own rules.",
      },
    ],
    faqs: [
      {
        q: "Can an SMSF borrow to buy property?",
        a: "Yes, through a limited recourse borrowing arrangement. The property is held in a separate bare trust and the lender's recourse is limited to that asset.",
      },
      {
        q: "How much deposit does an SMSF need?",
        a: "Commonly 20% to 30% for residential and 30% to 35% for commercial, plus costs and a liquidity buffer the lender will want retained in the fund.",
      },
      {
        q: "What's the minimum balance for an SMSF loan?",
        a: "We work with funds from around $300,000, or funds that already hold a property. Below $200,000 the costs rarely justify the structure.",
      },
      {
        q: "Can my SMSF buy my business premises?",
        a: "Business real property can generally be purchased by the fund and leased back at market rates. The rules are specific — your accountant or adviser should confirm it suits your fund.",
      },
    ],
    formType: "smsf",
    related: ["commercial-property-loans", "investment-property", "business-loans"],
  },
];
