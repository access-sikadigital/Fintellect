import type { Faq } from "@/data/types";
import type { IconName } from "@/components/ui/Icon";
import { site } from "@/data/site";

/**
 * Content that appears on every service page. Kept in one place so a wording
 * change — particularly anything the licensee has to approve — happens once.
 */

/** 4 — Speed. The strongest defensible claim Fintellect has. */
export const speed = {
  eyebrow: "Speed",
  heading: "We answer while it still matters.",
  body: `Most enquiries get a call back within about ${site.callbackMinutes} minutes during business hours. We try three times before we give up on you.`,
  timeline: [
    { label: "First call back", value: `~${site.callbackMinutes} minutes` },
    { label: "Indicative answer", value: "Same day" },
    { label: "Formal approval", value: "Typically 1–2 weeks" },
  ],
};

/** 5 — How it works. Identical across every service. */
export const howItWorks: {
  n: string;
  icon: IconName;
  title: string;
  body: string;
}[] = [
  {
    n: "01",
    icon: "chat",
    title: "Tell us the situation",
    body: "One short form or one call. We ask what the money is for first — that decides everything after it.",
  },
  {
    n: "02",
    icon: "clock",
    title: "We come back fast",
    body: `A call within about ${site.callbackMinutes} minutes in business hours. You'll know whether we can help by the end of it.`,
  },
  {
    n: "03",
    icon: "search",
    title: "We shortlist and pre-position",
    body: "We compare the lenders who will actually say yes, then structure the application so it lands right the first time.",
  },
  {
    n: "04",
    icon: "check",
    title: "We handle it to settlement",
    body: "Lodgement, valuation, conditions and paperwork. One point of contact the whole way.",
  },
];

/** 7 — Credentials. */
export const credentials = [
  { label: "Australian Credit Licence", value: site.acl },
  { label: "Aggregator", value: site.aggregator },
  { label: "Offices", value: site.offices.join(" & ") },
  { label: "Lending", value: "Australia-wide" },
];

/** 8 — The three objections Robert says he hears on nearly every call. */
export const commonObjections: Faq[] = [
  {
    q: "What does this cost me?",
    a: "Nothing, on the loans advertised on this site. The lender pays the broker a commission when the loan settles — most people don't know that, and it's the single most common thing we get asked. Fees do apply to private lending and some commercial deals, and you'll have the number before you commit to anything.",
  },
  {
    q: "Will shopping around hurt my credit file?",
    a: "Not the way we do it. We assess your position and shortlist lenders before anything is formally submitted, so you aren't collecting enquiries on your file while we work out where you fit.",
  },
  {
    q: "How do I know you're not just pushing one lender?",
    a: "We hold our own Australian Credit Licence rather than sitting on a restricted aggregator panel, which means we can reach lenders other brokers can't. We'll tell you which ones we compared and why the recommendation is the recommendation.",
  },
];

/**
 * 11 — Compliance footer.
 *
 * PLACEHOLDER. The website scope lists the licensee's written advertising
 * guidelines and required disclaimer wording as outstanding. Replace this
 * before launch with the wording Robert supplies.
 */
export const complianceNote = `${site.legalName} holds Australian Credit Licence ${site.acl}. The information on this page is general only and does not take your objectives, financial situation or needs into account. Lending criteria, fees, charges, terms and conditions apply and are subject to change. Approval is subject to the lender's assessment.`;

/** Language the scope rules out entirely. Enforced in review, noted here. */
export const excludedLanguage = ["guaranteed results", "cheapest rates"];

/**
 * Qualifying rules, taken verbatim in substance from the discovery form.
 * These drive the conditional logic in the enquiry forms.
 */
export const qualifyingRules = {
  residential: {
    label: "Home loans",
    rules: [
      "Minimum household income $100,000",
      "Minimum 5% deposit or equity",
      "Any loan size, any state, any LVR",
      "All employment types considered",
      "Clean credit preferred, not essential",
      "You don't need to own property already",
    ],
    excluded: ["Non-residents", "Temporary visa holders"],
  },
  commercial: {
    label: "Commercial & business",
    rules: [
      "Minimum two years trading",
      "ABN and GST registered",
      "Cashflow, vehicle, equipment or business purchase",
      "Property security preferred, not required",
    ],
    excluded: ["Business purchase without a 50% deposit"],
  },
  asset: {
    label: "Equipment & asset finance",
    rules: [
      "Minimum two-year ABN, GST registered",
      "Used assets within ten years",
      "Private or dealer sale both fine",
      "Low doc comfortable to $100,000",
    ],
    excluded: ["Caravans and boats", "Current defaults or credit issues"],
  },
  smsf: {
    label: "SMSF lending",
    rules: [
      "Fund already established",
      "Minimum $300,000 balance or an existing property",
      "Accountant or adviser already involved",
    ],
    excluded: ["Funds under $200,000", "Fund setup — we refer that to your accountant"],
  },
  professional: {
    label: "Professionals",
    rules: [
      "Permanent residency minimum",
      "Specialists, registrars and residents all count",
      "Up to 95% LVR with no LMI through the major banks",
      "Home loans and practice finance both in scope",
    ],
    excluded: ["Temporary visa holders"],
  },
} as const;

/** Robert's stated 30-second tell that a lead will never settle. */
export const autoDisqualifier = "Shopping around for the best rate only";

/** The universal first question on every enquiry form. */
export const openingQuestion = "What is the main purpose of the enquiry?";
