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
  /** Hero photograph. Only the published guides have one. */
  heroImage?: string;
  /**
   * Undefined means "planned but not written yet".
   *
   * A section may carry its own `image`, which renders as a full-width figure
   * beneath that section's copy. One per guide is plenty — it breaks the run
   * of text at the point the argument turns, rather than decorating.
   */
  body?: {
    heading: string;
    paragraphs: string[];
    image?: { src: string; alt: string };
  }[];
  faqs?: Faq[];
  related?: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: "when-to-refinance",
    heroImage: "/brand/photography/guide-when-to-refinance.webp",
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
    heroImage: "/brand/photography/guide-low-doc-home-loans.webp",
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
    heroImage: "/brand/photography/guide-lmi-waivers.webp",
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
    heroImage: "/brand/photography/guide-broker-fees.webp",
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
    heroImage: "/brand/photography/guide-low-doc-business.webp",
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
    heroImage: "/brand/photography/guide-chattel-vs-lease.webp",
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

  {
    slug: "how-much-can-i-borrow",
    heroImage: "/brand/photography/guide-borrowing-capacity.webp",
    title: "How much can I borrow for a home loan?",
    summary:
      "Why the bank's number is lower than you expected, and the four things that move it.",
    cluster: "Borrowing",
    keyword: "how much can i borrow home loan",
    volume: 2900,
    kd: 41,
    updated: "September 2026",
    readMinutes: 6,
    body: [
      {
        heading: "Your limit is set by a rate you will never pay",
        paragraphs: [
          "Every lender in Australia has to test your application at your actual rate plus three percentage points. With variable rates sitting around 6% in September 2026, most applications are being assessed near 9%.",
          "That single rule explains almost every disappointing number. You are not being asked whether you can afford the repayment. You are being asked whether you could afford it if rates rose by three per cent tomorrow.",
        ],
      },
      {
        heading: "Roughly four to six times income, then adjustments",
        paragraphs: [
          "As a starting point most lenders land somewhere between four and six times gross household income. Where you fall in that range is decided by what sits around the income rather than the income itself.",
          "Dependants reduce it. HECS or HELP reduces it, because the repayment is treated as an ongoing commitment. Credit cards reduce it by their limit, not their balance — an unused $10,000 card is assessed as though it were drawn. Car and personal loans reduce it hardest of all, because the terms are short and the repayments are large.",
        ],
      },
      {
        heading: "A rule that changed in February 2026",
        image: {
          src: "/brand/photography/guide-borrowing-capacity-2.webp",
          alt: "A desk with a laptop, calculator and printed figures",
        },
        paragraphs: [
          "APRA now restricts banks from writing more than a fifth of their new lending above six times a borrower's gross income. It is a cap on the bank's book, not on you personally, but the effect on borrowers at the top of their capacity is the same: the answer comes back as no more often than it used to.",
          "Non-bank lenders sit outside that cap. That does not make them cheap or automatically right, but it does mean a file the banks have run out of room for is not necessarily a file that cannot be written.",
        ],
      },
      {
        heading: "The levers that actually move the number",
        paragraphs: [
          "Closing credit card limits you are not using is the fastest and least painful. Cancelling a $20,000 limit can be worth tens of thousands of borrowing capacity and costs you nothing you were using.",
          "The assessed rate matters more than most people expect — roughly $15,000 to $25,000 of capacity for every half a per cent. And lender choice matters most of all, because expense benchmarks and income policies differ enough that the same file can vary by six figures between two lenders on the same day.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is the bank's number lower than the online calculator?",
        a: "Calculators use a generic expense benchmark and ignore most of your commitments. A real assessment uses your declared living costs, your card limits, any HECS balance, and that lender's own floor rate. The gap between the two is normal and is usually large.",
      },
      {
        q: "Does HECS or HELP really make a difference?",
        a: "Yes, and more than people expect. It is assessed as a continuing repayment against your income, so on a moderate salary it can move borrowing capacity by tens of thousands of dollars. Paying it out shortly before applying does not always help, because some lenders still want to see it cleared on a payslip.",
      },
      {
        q: "Can I borrow more than six times my income?",
        a: "Sometimes, but it is a credit policy question rather than a rate question. Banks have limited room above that level and use it selectively. It is one of the situations where holding our own credit licence is the difference, because we can reach lenders who are not subject to the same cap.",
      },
    ],
    related: [
      { label: "Borrowing capacity calculator", href: "/calculators/borrowing-capacity" },
      { label: "Self-employed home loans", href: "/home-loans/self-employed" },
    ],
  },
  {
    slug: "fixed-rate-ending",
    heroImage: "/brand/photography/guide-fixed-rate.webp",
    title: "My fixed rate is ending — what should I do?",
    summary:
      "What the revert rate costs, when to start, and the phone call worth making first.",
    cluster: "Refinance",
    keyword: "fixed rate expiring",
    volume: 590,
    kd: 24,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "What happens if you do nothing",
        paragraphs: [
          "At the end of a fixed term the loan rolls onto the lender's revert rate automatically. That rate is almost never the sharpest number the same lender is offering new customers that week.",
          "The gap is rarely small. On a $700,000 loan, one percentage point is roughly $580 a month. Doing nothing is a decision with a price on it, and the price is charged monthly until you act.",
        ],
      },
      {
        heading: "Start ninety days out, not on the day",
        paragraphs: [
          "Discharging one loan and settling another takes weeks, and the paperwork does not begin until the assessment is done. Borrowers who start when the fixed rate ends typically spend two or three months on the revert rate regardless of what they decide.",
          "Ninety days is comfortable. Sixty is workable. Thirty means you will pay the revert rate for a while no matter how organised you are.",
        ],
      },
      {
        heading: "Ask your own lender first",
        image: {
          src: "/brand/photography/guide-fixed-rate-2.webp",
          alt: "A couple going through loan paperwork together at home",
        },
        paragraphs: [
          "Lenders keep pricing in reserve for customers who are about to leave, and a fixed rate expiry is the moment they expect to lose you. One phone call asking to be moved to their new-customer rate sometimes closes most of the gap.",
          "If it does, you are done and it cost you ten minutes. If it does not, you now know exactly how big the gap is, which is the number any other lender has to beat.",
        ],
      },
      {
        heading: "Fixing again, in a market that is moving up",
        paragraphs: [
          "As at September 2026 the cash rate is 4.35% and the forecasters are openly split on whether the next move is up or a hold. Nobody writing about this — us included — knows what happens next.",
          "That is the honest frame for the decision. Fixing buys a known repayment, not a saving. It costs flexibility: break fees if you move, caps on extra repayments, and offset accounts that are often limited or unavailable. Fix if certainty is worth more to your household than that flexibility, not because you expect to win a bet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will I be charged a break fee for leaving?",
        a: "Not for leaving at the end of the fixed term — break costs apply when you exit part way through. You will still pay a discharge fee to the outgoing lender and government registration fees, which usually total a few hundred dollars.",
      },
      {
        q: "Should I fix again or go variable?",
        a: "It depends on whether a predictable repayment matters more to you than flexibility, and nobody can answer that from the outside. If your budget has no room for a rise, certainty has real value. If you expect to sell, renovate or make large extra repayments, fixing will get in the way.",
      },
      {
        q: "Can I split the loan?",
        a: "Yes, and it is a common middle path. Part fixed for certainty, part variable so you keep an offset and the ability to pay extra. It suits people who cannot decide because both arguments genuinely apply to them.",
      },
    ],
    related: [
      { label: "Refinancing", href: "/home-loans/refinance" },
      { label: "Refinance savings calculator", href: "/calculators/refinance-savings" },
    ],
  },
  {
    slug: "debt-consolidation-home-loan",
    heroImage: "/brand/photography/guide-debt-consolidation.webp",
    title: "Should I put my debts into my home loan?",
    summary:
      "The maths that makes it look obvious, and the two things that decide whether it works.",
    cluster: "Refinance",
    keyword: "debt consolidation home loan",
    volume: 1900,
    kd: 38,
    updated: "September 2026",
    readMinutes: 6,
    body: [
      {
        heading: "Why the arithmetic looks so good",
        paragraphs: [
          "In September 2026 credit cards commonly sit between 19% and 22%, personal loans between 10% and 13%, and car loans between 7% and 9%. Owner-occupier home loans are around 5.7% to 5.9%.",
          "Move $30,000 off a card at 20% onto a home loan at under 6% and the interest on that balance falls by thousands of dollars a year. The gap is real, which is why consolidation enquiries rose roughly 47% through early 2026.",
        ],
      },
      {
        heading: "The trap is the term, not the rate",
        image: {
          src: "/brand/photography/guide-debt-consolidation-2.webp",
          alt: "Statements and a calculator spread across a desk",
        },
        paragraphs: [
          "A card balance you would have cleared in three years, spread across the twenty-five years left on your mortgage, can cost more in total interest than leaving it where it was — even at a third of the rate.",
          "Consolidation only wins if you keep paying the old amount. Take the lower minimum repayment and you have not saved money, you have rescheduled it and added interest. This is the single reason most consolidations disappoint.",
        ],
      },
      {
        heading: "You are converting unsecured debt into secured debt",
        paragraphs: [
          "A credit card is not secured against your house. Once the balance is inside the mortgage, it is. If things go wrong later, the consequences are no longer a default and a collections process — they involve the property.",
          "That is not an argument against doing it. It is the trade being made, and it should be made deliberately rather than discovered afterwards.",
        ],
      },
      {
        heading: "What a lender needs before it will agree",
        paragraphs: [
          "Most want the loan to sit at or below 80% of the property value once the debts are added, because above that line mortgage insurance usually applies to the whole amount. Many require the consolidated accounts to be closed at settlement rather than simply paid to zero.",
          "Recent arrears are the most common reason a file fails. Missed payments in the last six months narrow the lender list sharply, which is exactly when getting the order and the presentation right matters most.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much equity do I need?",
        a: "Enough that the combined loan stays at or under about 80% of the property's value. Above that, lenders mortgage insurance generally applies and is charged on the full loan, which can wipe out the saving you were consolidating to get.",
      },
      {
        q: "Will consolidating hurt my credit file?",
        a: "Closing the accounts is usually neutral to positive over time. The applications themselves are recorded as enquiries, so making several at once is the part that does damage — another reason to apply once, to the right lender.",
      },
      {
        q: "Is it always a good idea?",
        a: "No, and we will say so. If the spending that created the balances has not changed, consolidation clears the cards and they refill within a year or two — except now the original debt is secured against your home as well. That is a worse position than the one you started in.",
      },
    ],
    related: [
      { label: "Debt consolidation", href: "/home-loans/debt-consolidation" },
      { label: "Refinance savings calculator", href: "/calculators/refinance-savings" },
    ],
  },

  /* ── Planned, not yet written ─────────────────────────────────────── */
  { slug: "how-to-refinance-a-home-loan", title: "How to refinance a home loan in Australia", summary: "The whole process, what it costs, and how long it takes.", cluster: "Refinance", keyword: "how to refinance a home loan", volume: 1300, kd: 54, updated: "", readMinutes: 0 },
  { slug: "should-i-refinance", title: "Should I refinance? A broker's honest answer", summary: "Sometimes no. Here's how to tell which one you are.", cluster: "Refinance", keyword: "should i refinance my home loan", volume: 260, kd: 32, updated: "", readMinutes: 0 },
  {
    slug: "bank-said-no-home-loan",
    heroImage: "/brand/photography/guide-bank-said-no.webp",
    title: "The bank said no. What can a broker actually do?",
    summary:
      "A decline is usually a policy mismatch, not a verdict on you. Here is what changes second time round.",
    cluster: "Self-employed",
    keyword: "bank declined home loan",
    volume: 480,
    kd: 34,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "A decline is a policy mismatch, not a verdict",
        paragraphs: [
          "Every lender writes its own credit policy, and they differ far more than the advertising suggests. A decline tells you that you did not fit one lender's rules, on one day, in the form the application was presented. It is not a statement about whether you can afford the loan.",
          "That is why the same person, with the same income and the same deposit, can be declined on Monday and approved on Thursday. Nothing about them changed. The lender did, and so did the way the file was put together.",
        ],
      },
      {
        heading: "The three reasons we see most",
        image: {
          src: "/brand/photography/guide-bank-said-no-2.webp",
          alt: "A self-employed tradesperson in his own workshop",
        },
        paragraphs: [
          "Self-employed income read straight off the taxable figure is the biggest. A good accountant's job is to make that number small; the bank then reads it as your capacity to repay. Add-backs for depreciation, one-off expenses and interest on debts being cleared often move it substantially.",
          "Second is income the lender does not like the shape of — casual, contract, overtime, commission or bonus. Some lenders count all of it, some count 80%, some want two years of it. Third, and increasingly common since APRA's February 2026 cap on high debt-to-income lending, is a file that is simply at the top of what a bank has room to write.",
        ],
      },
      {
        heading: "Why the second application matters more than the first",
        paragraphs: [
          "Every application leaves a credit enquiry, and several enquiries in a short window is itself a reason to decline. Applying to three more lenders in the hope one says yes makes the fourth one harder.",
          "So the work is order and presentation: identifying the lender whose policy actually fits, evidencing the income the way that lender wants to see it, and going once. That is a slower answer than reapplying immediately, and it is the reason declines get overturned.",
        ],
      },
      {
        heading: "What we will tell you if it genuinely does not work",
        paragraphs: [
          "Sometimes the answer really is not yet. If the deposit is short, the arrears are recent, or the trading history is too thin, no amount of presentation fixes that this month.",
          "If that is the case we will say so on the first call and tell you what needs to change and roughly how long it takes. That costs us the deal and keeps us worth referring.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a decline hurt my credit score?",
        a: "The enquiry is recorded on your file, not the outcome — a lender cannot see that you were declined, only that you applied. What does the damage is several enquiries close together, because that pattern reads as someone being knocked back repeatedly.",
      },
      {
        q: "How soon can I apply again?",
        a: "As soon as the reason has actually changed. Reapplying to the same lender without changing the file wastes an enquiry and produces the same answer. Applying to a different lender whose policy fits can happen straight away.",
      },
      {
        q: "Will you tell me before you lodge anything?",
        a: "Yes. Nothing is submitted and no credit check is run until you have seen where it is going and why. The first conversation is a conversation, not an application.",
      },
    ],
    related: [
      { label: "Self-employed home loans", href: "/home-loans/self-employed" },
      { label: "Low doc and alt doc loans, explained", href: "/guides/self-employed-home-loans-explained" },
    ],
  },
  {
    slug: "how-much-is-lmi",
    heroImage: "/brand/photography/guide-lmi-cost.webp",
    title: "How much is LMI, and can you avoid it?",
    summary:
      "What drives the premium, why capitalising it costs more than the sticker, and the four ways out.",
    cluster: "Professionals",
    keyword: "how much is lmi",
    volume: 1600,
    kd: 30,
    updated: "September 2026",
    readMinutes: 5,
    body: [
      {
        heading: "Two numbers decide the premium",
        paragraphs: [
          "Lenders mortgage insurance is priced off the size of the loan and the loan-to-value ratio, and it does not rise in a straight line. The step from 80% to 85% is mild. The step from 90% to 95% is where the premium becomes one of the largest costs in the whole purchase.",
          "It is worth being clear about what you are buying: the policy covers the lender's shortfall if the loan is ever sold up at a loss. It is not insurance for you, and it does not reduce what you owe.",
        ],
      },
      {
        heading: "Most people never pay it — they borrow it",
        paragraphs: [
          "The premium is usually capitalised, meaning it is added to the loan rather than paid at settlement. That is convenient and it is why the cost is so easy to wave through.",
          "It also means you pay interest on the premium for as long as the loan runs. A premium added to a thirty-year loan costs considerably more than the figure quoted, and that total is the number worth comparing against your alternatives.",
        ],
      },
      {
        heading: "The four ways out",
        image: {
          src: "/brand/photography/guide-lmi-cost-2.webp",
          alt: "A couple holding the keys to their new home",
        },
        paragraphs: [
          "Get to a 20% deposit, either by saving longer or buying at a lower price. Qualify for a profession-based waiver — medical, accounting and legal professionals commonly reach 90% or 95% with no premium at all. Use a family guarantee, where a relative's equity secures part of the loan. Or use a government guarantee scheme if you are eligible.",
          "Which of these is available to you is usually decided in one conversation. Which lender honours it is the part that takes work, because approved occupation lists and guarantee policies differ at every bank.",
        ],
      },
      {
        heading: "When paying it is the right decision",
        paragraphs: [
          "Avoiding LMI is not automatically the goal. If getting to a 20% deposit takes two more years, the honest comparison is the premium against two years of rent plus whatever the market does in that time.",
          "Sometimes the premium is clearly the cheaper path and paying it is the rational choice. Sometimes waiting wins comfortably. It is worth running both rather than assuming, because the answer flips depending on your deposit, your timeline and the market you are buying into.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is LMI refundable if I sell or refinance early?",
        a: "Partially, and only within a short window — commonly the first year or two, with the refundable share dropping quickly. Most borrowers who move later get nothing back, so it is not worth planning around.",
      },
      {
        q: "Can I transfer my LMI to a new lender?",
        a: "No. The policy belongs to the original lender, so refinancing above 80% generally means a fresh premium. It is one of the reasons refinancing at a high LVR often does not stack up, even when the new rate looks better.",
      },
      {
        q: "Does LMI protect me if I cannot pay?",
        a: "No, and this is the most common misunderstanding. It protects the lender. If the property sells for less than the debt, the insurer pays the lender and can then pursue you for the shortfall.",
      },
    ],
    related: [
      { label: "LMI calculator", href: "/calculators/lmi" },
      { label: "LMI waivers for professionals", href: "/guides/lmi-waiver-professionals" },
    ],
  },
  {
    slug: "smsf-property-loans",
    heroImage: "/brand/photography/guide-smsf.webp",
    title: "Can my super fund buy a property?",
    summary:
      "Yes, within limits — and the limits are the whole story. What a fund needs before a lender will look at it.",
    cluster: "SMSF",
    keyword: "smsf property loan",
    volume: 1000,
    kd: 28,
    updated: "September 2026",
    readMinutes: 6,
    body: [
      {
        heading: "How the borrowing is structured",
        paragraphs: [
          "A self-managed super fund can borrow to buy property, but only through a limited recourse borrowing arrangement. The property is held in a separate holding trust until the loan is repaid, and the lender's recourse is limited to that one asset rather than the rest of the fund.",
          "That structure is the reason the lending is different. The lender cannot reach the fund's other investments if things go wrong, so it prices and assesses the loan more conservatively than a personal purchase.",
        ],
      },
      {
        heading: "What lenders want to see from the fund",
        paragraphs: [
          "A larger deposit than you would need personally — commonly 20% to 30% of the value, and more for commercial property. Evidence that contributions and expected rent comfortably cover the repayments, assessed with the same buffer applied to everyone else.",
          "And liquidity left behind. Lenders generally want the fund to still hold a meaningful cash balance after settlement, because a fund with everything tied up in one property has no way to cover a vacancy or a repair.",
        ],
      },
      {
        heading: "The rules that catch people out",
        image: {
          src: "/brand/photography/guide-smsf-2.webp",
          alt: "A For Lease sign outside a weatherboard house",
        },
        paragraphs: [
          "If the property is residential, no member of the fund or their relatives can live in it or rent it, at any price. This one ends more plans than any other, usually when someone realises they cannot house an adult child in it. Business real property is treated differently and can be leased to a member's own business.",
          "While the loan is in place the asset generally cannot be improved in a way that changes its character. Repairs and maintenance are fine. Knocking a house down and building two townhouses is not, unless the borrowing has been repaid first.",
        ],
      },
      {
        heading: "Costs, and getting back out",
        paragraphs: [
          "Expect set-up costs for the holding trust and the advice around it, a much smaller panel of lenders willing to write the loan, and rates above a standard residential mortgage. None of that is a reason not to do it, but it changes the return calculation and should be in the numbers from the start.",
          "Selling is straightforward. Refinancing is not always — some lenders have withdrawn from SMSF lending entirely, so the option to move later is narrower than it is on an ordinary loan. That is worth knowing before you fix your plans around a future refinance.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I live in a property my super fund owns?",
        a: "Not if it is residential — not you, not a relative, not at market rent. Business real property is the exception: a fund can own the premises its member's business trades from, provided it is leased at market terms.",
      },
      {
        q: "How much does the fund need to have?",
        a: "Beyond the deposit and purchase costs, lenders generally want a cash buffer left in the fund after settlement so it can absorb a vacancy or a repair. Thresholds vary by lender, and it is one of the first things worth checking rather than assuming.",
      },
      {
        q: "Is this financial advice?",
        a: "No. SMSF borrowing sits across credit, tax and superannuation law at once, and we are licensed for the credit part only. We arrange the loan and work alongside your accountant and your licensed adviser, who should be the ones telling you whether the strategy suits your fund at all.",
      },
    ],
    related: [
      { label: "SMSF loans", href: "/smsf-loans" },
      { label: "Borrowing capacity calculator", href: "/calculators/borrowing-capacity" },
    ],
  },
  { slug: "refinance-cashback-offers", title: "Refinance cashback offers — what to watch for", summary: "What the cashback costs you in rate over the term.", cluster: "Refinance", keyword: "refinance cashback", volume: 1600, kd: 52, updated: "", readMinutes: 0 },
];

export const publishedGuides = guides.filter((g) => Boolean(g.body));
export const plannedGuides = guides.filter((g) => !g.body);
export const findGuide = (slug: string) => guides.find((g) => g.slug === slug && g.body);
