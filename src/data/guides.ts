import type { Faq } from "@/data/types";

/**
 * Guides — the launch set.
 *
 * Six written, mapped to validated question keywords from the workbook's
 * content plan. The remaining briefs stay listed as upcoming so the hub shows
 * the full plan without pretending they exist.
 */
export type Guide = {
  slug: string;
  title: string;
  summary: string;
  cluster: string;
  /** Target keyword from the content plan. */
  keyword: string;
  volume?: number;
  kd?: number;
  updated: string;
  readMinutes: number;
  /** Undefined means "planned but not written yet". */
  body?: { heading: string; paragraphs: string[] }[];
  faqs?: Faq[];
  related?: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: "when-to-refinance",
    title: "When should you refinance your home loan?",
    summary: "The four triggers worth acting on — and when the honest answer is to stay put.",
    cluster: "Refinance",
    keyword: "when to refinance home loan",
    volume: 320,
    kd: 22,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "The four triggers that actually matter",
        paragraphs: [
          "Most people refinance because something changed, not because they went looking. The four changes worth acting on are a fixed term ending, two or more years on the same variable rate, a shift in income or household circumstances, and having built enough equity to be worth releasing.",
          "Everything else — a rate advertised somewhere, a cashback offer, a friend who switched — is a prompt to check, not a reason to move. Checking costs nothing. Moving costs money.",
        ],
      },
      {
        heading: "Your fixed term is ending",
        paragraphs: [
          "This is the single most common trigger, and the one most often missed. When a fixed term ends, most loans roll onto the lender's standard variable rate, which is rarely the sharpest number that lender offers.",
          "The window to act is roughly sixty days before expiry. Start earlier and the new lender's approval may lapse; start later and you spend months on a revert rate you didn't choose.",
        ],
      },
      {
        heading: "You've been on the same variable rate for two years",
        paragraphs: [
          "Lenders price to win new business, not to reward loyalty. It is entirely normal for a two-year-old loan to sit meaningfully above what the same lender is advertising to new customers that week.",
          "Ask your current lender for a repricing before you do anything else. It costs one phone call and sometimes closes most of the gap. If it doesn't, you now know what the gap actually is.",
        ],
      },
      {
        heading: "When the answer is to stay put",
        paragraphs: [
          "If you are likely to sell within two years, if your loan balance is small enough that the switching costs swallow the saving, or if your current lender has already matched the market, refinancing is a lot of paperwork for very little.",
          "The test is the break-even point: total switching costs divided by the monthly saving. If that number of months is longer than you expect to hold the loan, don't move.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often can you refinance a home loan?",
        a: "There is no legal limit. In practice, refinancing more than once every year or two starts to look unusual to lenders, and each switch carries costs that need recovering before the next one.",
      },
      {
        q: "Does refinancing restart your loan term?",
        a: "It can, and that's worth watching. Moving a loan with 22 years left onto a fresh 30-year term lowers the monthly repayment while increasing total interest. Ask for the remaining term to be matched instead.",
      },
    ],
    related: [
      { label: "Refinance", href: "/home-loans/refinance" },
      { label: "Refinance savings calculator", href: "/calculators/refinance-savings" },
    ],
  },
  {
    slug: "self-employed-home-loans-explained",
    title: "Low doc and alt doc home loans, explained",
    summary: "What lenders accept instead of two years of tax returns, and who accepts what.",
    cluster: "Self-employed",
    keyword: "low doc home loan",
    volume: 880,
    kd: 24,
    updated: "September 2026",
    readMinutes: 6,
    body: [
      {
        heading: "The problem these loans exist to solve",
        paragraphs: [
          "A good accountant's job is to minimise your taxable income. A major bank's home loan assessment reads that same taxable income as your capacity to repay. Those two facts are in direct conflict, and that conflict is why profitable self-employed people get declined.",
          "Alt doc and low doc lending exists because that decline is a documentation problem, not a credit problem. The income is real. It just isn't visible in the document the bank asked for.",
        ],
      },
      {
        heading: "What lenders will accept instead",
        paragraphs: [
          "The common alternatives are twelve months of Business Activity Statements, six to twelve months of business bank statements, or a signed declaration from your accountant confirming your income. Some lenders want one of these; others want two in combination.",
          "A smaller group will work from one year of tax returns rather than two, which suits businesses that are established but recently restructured.",
        ],
      },
      {
        heading: "Add-backs: the part people don't know about",
        paragraphs: [
          "Assessable income is not the same as taxable income. Depreciation, one-off expenses, additional superannuation contributions, and interest on debts being refinanced can generally be added back to your declared profit.",
          "Presented properly, add-backs frequently lift assessable income well above the figure on the return — sometimes by enough to turn a decline into an approval with no change to the underlying business.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Alt doc rates sit above full-doc major bank rates, though the gap has narrowed considerably. The premium reflects documentation, not risk of default.",
          "Many borrowers refinance to a standard rate once two years of returns exist. Treating the alt doc loan as a two-year bridge rather than a thirty-year commitment changes the maths substantially.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do I need to be self-employed to get a home loan?",
        a: "Most banks want two years. Several specialist lenders assess from twelve months of trading, particularly where you worked in the same industry beforehand.",
      },
      {
        q: "Are low doc loans still available in Australia?",
        a: "Yes. They changed considerably after responsible lending reforms — lenders now verify alternative documents rather than accepting self-certification — but alt doc lending is a normal, regulated part of the market.",
      },
    ],
    related: [
      { label: "Self-employed home loans", href: "/home-loans/self-employed" },
      { label: "Low doc business loans", href: "/commercial-finance/low-doc-business-loans" },
    ],
  },
  {
    slug: "lmi-waiver-professionals",
    title: "LMI waivers for doctors, accountants and lawyers",
    summary: "Who qualifies, at what LVR, and why the answer differs at every lender.",
    cluster: "Professionals",
    keyword: "lmi waiver",
    volume: 720,
    kd: 29,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "What the waiver actually is",
        paragraphs: [
          "Lenders mortgage insurance is a one-off premium charged when you borrow more than 80% of a property's value. It insures the lender, not you. On a high-LVR purchase it is frequently the largest single cost in the transaction.",
          "Several major banks waive it entirely for certain professions, based on the default rates those professions have historically shown. The loan is the same. The premium simply isn't charged.",
        ],
      },
      {
        heading: "Who qualifies, and to what level",
        paragraphs: [
          "Medical practitioners — including specialists, GPs, registrars and residents — commonly reach 95% of the property value with no LMI. Dentists and veterinarians are on most lists.",
          "Accountants holding current CA, CPA or IPA membership and admitted legal practitioners typically reach 90%. Some lenders extend the list to actuaries and engineers.",
        ],
      },
      {
        heading: "Why the lender you choose decides the outcome",
        paragraphs: [
          "There is no industry-wide waiver. Each lender publishes its own approved occupation list, its own LVR cap and, sometimes, a minimum income threshold. A registrar accepted at one bank is outside policy at the next.",
          "This is the entire value of advice on a professional purchase. The rate difference between lenders is usually small; the difference between a waiver and a five-figure premium is not.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does the LMI waiver save?",
        a: "It varies with loan size and LVR. On a high-LVR purchase in a capital city the waived premium commonly runs into five figures, and it is a cost you would otherwise either pay upfront or capitalise onto the loan and pay interest on for years.",
      },
      {
        q: "Do I still need a deposit?",
        a: "Yes. The waiver removes the insurance, not the deposit. Most waivers still require 5% to 10% of the purchase price plus costs, and genuine savings requirements can apply.",
      },
    ],
    related: [
      { label: "Home loans for doctors", href: "/home-loans/doctors-medical-professionals" },
      { label: "LMI calculator", href: "/calculators/lmi" },
    ],
  },
  {
    slug: "how-mortgage-brokers-get-paid",
    title: "How mortgage brokers get paid (and why it costs you nothing)",
    summary: "Upfront, trail, and why the lender pays rather than you.",
    cluster: "Trust",
    keyword: "how do mortgage brokers get paid",
    updated: "September 2026",
    readMinutes: 4,
    body: [
      {
        heading: "The lender pays, not you",
        paragraphs: [
          "On the residential home loans described on this site, the lender pays the broker a commission when the loan settles. You are not charged a fee, and the rate you receive is not increased to fund it.",
          "This is the single most common question we are asked, and most people are surprised by the answer. It is worth stating plainly because it changes how the conversation feels: there is no cost to finding out whether we can help.",
        ],
      },
      {
        heading: "Upfront and trail",
        paragraphs: [
          "Commission comes in two parts. An upfront amount is calculated on the loan size and paid at settlement. A smaller trail commission is paid monthly for as long as the loan stays open.",
          "Trail is the part that aligns the incentives. A broker paid to keep a loan performing has a reason to check in years later, and a reason not to put you in something unsuitable that you'll leave within a year.",
        ],
      },
      {
        heading: "Where fees do apply",
        paragraphs: [
          "Private lending and some commercial and asset finance transactions carry a broker fee. Where one applies you will be told the amount before you commit to anything, and it will appear in writing in the credit proposal.",
          "If a broker cannot tell you clearly how they are paid on your specific loan, that is worth noticing.",
        ],
      },
      {
        heading: "Does commission differ between lenders?",
        paragraphs: [
          "Slightly, yes. Commission rates vary a little across the panel. That difference does not decide the recommendation, and you are entitled to ask which lenders were compared and why one was chosen.",
          "We hold our own Australian Credit Licence rather than operating on a restricted aggregator panel, which means the shortlist is built from what fits your situation rather than from a list someone else set.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it cheaper to go direct to the bank?",
        a: "Generally no. Broker commission is paid by the lender out of its own margin and is not added to your rate. Going direct removes the comparison, not the cost.",
      },
      {
        q: "What is a clawback?",
        a: "If a loan is repaid within the first one to two years, the lender reclaims part of the upfront commission from the broker. It does not affect you, but it explains why a broker will usually ask about your plans before recommending a switch.",
      },
    ],
    related: [
      { label: "Credit guide", href: "/credit-guide" },
      { label: "About Fintellect", href: "/about" },
    ],
  },
  {
    slug: "low-doc-business-loans-explained",
    title: "Low doc business loans: what lenders actually need",
    summary: "Six months of bank statements usually replaces a full set of financials.",
    cluster: "Commercial",
    keyword: "low doc business loan",
    volume: 1000,
    kd: 9,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "Why they exist",
        paragraphs: [
          "Full financial statements take weeks to prepare and depend on your accountant's availability. Business funding needs rarely wait that long — a supplier deadline, an equipment purchase, a tax bill.",
          "Low doc commercial lenders assess on trading evidence instead: bank statements showing turnover, and BAS confirming it. It is a faster read of the same underlying business.",
        ],
      },
      {
        heading: "What you actually need",
        paragraphs: [
          "In most cases: an ABN registered at least two years, current GST registration, six to twelve months of business bank statements, and recent BAS lodgements.",
          "Property offered as security generally improves both the rate and the amount available, but unsecured and part-secured facilities exist and are worth comparing against the alternative.",
        ],
      },
      {
        heading: "What lenders look for in the statements",
        paragraphs: [
          "Consistency of turnover matters more than its size. Regular deposits across the period read better than one large month. Dishonours and consistently negative balances are the fastest route to a decline.",
          "An ATO debt is not automatically disqualifying. A debt on a payment plan being met is acceptable to several lenders, and refinancing ATO debt into a structured facility is a common reason businesses come to us.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Low doc commercial pricing sits above a secured full-doc facility. You are paying for speed and for the lender's reduced visibility.",
          "If your financials are three weeks away and the need is not urgent, waiting is often the cheaper decision. We will tell you when that is the case.",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can a low doc business loan settle?",
        a: "For an established ABN with clean credit, approval commonly comes back within a few business days, with settlement shortly after. Secured facilities take longer because of valuation.",
      },
      {
        q: "How much can I borrow?",
        a: "Unsecured facilities commonly run to a few hundred thousand dollars. Secured against property, substantially more. Turnover, trading history and ATO position all shape the limit.",
      },
    ],
    related: [
      { label: "Low doc business loans", href: "/commercial-finance/low-doc-business-loans" },
      { label: "Business loans", href: "/commercial-finance/business-loans" },
    ],
  },
  {
    slug: "chattel-mortgage-vs-lease",
    title: "Chattel mortgage vs equipment lease",
    summary: "Ownership, GST treatment, and which one your accountant will point you at.",
    cluster: "Asset finance",
    keyword: "chattel mortgage",
    volume: 3600,
    kd: 23,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "The difference in one line",
        paragraphs: [
          "Under a chattel mortgage you own the asset from day one and the financier registers a security interest over it. Under a lease the financier owns it and you pay to use it.",
          "Everything else — the GST treatment, what appears on your balance sheet, what you can claim — follows from that single distinction.",
        ],
      },
      {
        heading: "GST is usually the deciding factor",
        paragraphs: [
          "With a chattel mortgage, a GST-registered business can generally claim the full input tax credit on the purchase price in the BAS period of purchase. That is a substantial cashflow benefit in the first quarter.",
          "Under a lease, GST is claimed progressively on each payment instead. The total is comparable; the timing is very different.",
        ],
      },
      {
        heading: "Depreciation and interest",
        paragraphs: [
          "Holding the asset means you claim depreciation on it and the interest component of each repayment. Under a lease the payments are typically deductible as an operating expense instead.",
          "Which produces the better outcome depends on your tax position, not on the finance itself. This is a question for your accountant, and we build the finance to their answer rather than the other way round.",
        ],
      },
      {
        heading: "The balloon",
        paragraphs: [
          "A residual or balloon payment at the end of the term lowers the monthly repayment and raises the total cost. Set too high, it can leave you owing more than the asset is then worth.",
          "We will model the repayment both with and without one so the trade-off is visible rather than assumed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I claim the GST on a chattel mortgage?",
        a: "Generally yes — the full input tax credit in the BAS period of purchase, where the asset is used for business and you are registered for GST. Confirm the detail with your accountant.",
      },
      {
        q: "Which is better for a work vehicle?",
        a: "For most GST-registered businesses buying a vehicle they intend to keep, a chattel mortgage is the more common choice because of the up-front input tax credit and outright ownership.",
      },
    ],
    related: [
      { label: "Chattel mortgage", href: "/asset-finance/chattel-mortgage" },
      { label: "Equipment finance", href: "/asset-finance/equipment-finance" },
    ],
  },

  /* ── Planned, not yet written ─────────────────────────────────────── */
  { slug: "how-to-refinance-a-home-loan", title: "How to refinance a home loan in Australia", summary: "The whole process, what it costs, and how long it takes.", cluster: "Refinance", keyword: "how to refinance a home loan", volume: 1300, kd: 54, updated: "", readMinutes: 0 },
  { slug: "should-i-refinance", title: "Should I refinance? A broker's honest answer", summary: "Sometimes no. Here's how to tell which one you are.", cluster: "Refinance", keyword: "should i refinance my home loan", volume: 260, kd: 32, updated: "", readMinutes: 0 },
  { slug: "bank-said-no-home-loan", title: "Your bank said no. What a broker can still do", summary: "Why a decline is usually a presentation problem.", cluster: "Self-employed", keyword: "self employed home loan", volume: 480, kd: 34, updated: "", readMinutes: 0 },
  { slug: "how-much-is-lmi", title: "How much is lenders mortgage insurance?", summary: "What drives the premium, and how to avoid it entirely.", cluster: "Professionals", keyword: "how much is lmi", volume: 1600, updated: "", readMinutes: 0 },
  { slug: "smsf-property-loans", title: "SMSF property loans: rules, costs and criteria", summary: "What a fund needs before a lender will look at it.", cluster: "SMSF", keyword: "smsf lending", volume: 1000, kd: 28, updated: "", readMinutes: 0 },
  { slug: "refinance-cashback-offers", title: "Refinance cashback offers — what to watch for", summary: "What the cashback costs you in rate over the term.", cluster: "Refinance", keyword: "refinance cashback", volume: 1600, kd: 52, updated: "", readMinutes: 0 },
];

export const publishedGuides = guides.filter((g) => Boolean(g.body));
export const plannedGuides = guides.filter((g) => !g.body);
export const findGuide = (slug: string) => guides.find((g) => g.slug === slug && g.body);
