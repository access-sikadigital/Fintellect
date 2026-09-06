import type { ServicePage } from "@/data/types";

export const commercialServices: ServicePage[] = [
  {
    slug: "low-doc-business-loans",
    section: "commercial-finance",
    tier: 1,
    title: "Low Doc Business Loans | Fast Approval",
    metaDescription:
      "Low doc business loans assessed on bank statements and BAS rather than full financials. Two years trading, ABN and GST registered. ACL 515382.",
    primaryKeyword: "low doc business loan",
    volume: 1000,
    kd: 9,
    eyebrow: "Low doc business",
    h1: "Low doc business loans for self-employed owners",
    intro:
      "Full financials take weeks and your accountant is busy. Low doc lenders assess on bank statements and BAS instead, and they can move in days.",
    heroImage: "/brand/photography/svc-lowdoc.webp",
    heroAlt: "A team of business professionals",
    angle: {
      heading: "The business is fine. The paperwork is behind.",
      body: "Trading well and being able to prove it on a bank's timetable are two different things. Accountants are busy, returns get lodged late, and a strong business ends up looking unfundable on paper for six months of the year. Low doc lending exists precisely for that gap.",
    },
    explainer: {
      heading: "What a low doc business loan is",
      body: "Lending assessed on bank statements, BAS and an accountant's declaration rather than two years of finalised financials. Rates sit above full doc because the lender is carrying more uncertainty, and the sensible use of one is short term — fund the opportunity now, refinance to a full doc facility once the returns are lodged.",
      steps: [
        {
          n: "01",
          title: "Send bank statements and BAS",
          body: "Usually six to twelve months of trading statements and your most recent BAS. No finalised financials needed.",
        },
        {
          n: "02",
          title: "We match you to low doc lenders",
          body: "Each one weighs turnover, industry and ATO position differently. We go to the ones your file suits.",
        },
        {
          n: "03",
          title: "Fund now, refinance later",
          body: "Take the facility when you need it, then move to a cheaper full doc loan once the accountant catches up.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Trading at least two years",
        "ABN and GST registered",
        "Six months of business bank statements available",
        "Cashflow, equipment, vehicle or business purchase",
      ],
      notForThem: [
        "Under two years trading",
        "Not GST registered",
        "Business purchase without a 50% deposit",
      ],
    },
    advantages: [
      {
        icon: "clock",
        title: "Days, not weeks",
        body: "Bank statements and BAS instead of full financials removes the wait on your accountant. Several lenders can be at approval inside a week.",
      },
      {
        icon: "wallet-1",
        title: "Security optional",
        body: "Property security usually improves the rate, but unsecured and part-secured facilities exist and are worth comparing against the alternative.",
      },
      {
        icon: "search",
        title: "We read the statements first",
        body: "Lenders assess turnover consistency, ATO position and existing facilities. We look at the same data before lodging so there are no surprises.",
      },
      {
        icon: "check",
        title: "Honest about cost",
        body: "Low doc commercial pricing is higher than a secured full-doc facility. We'll tell you what full financials would save you and whether it's worth waiting.",
      },
    ],
    faqs: [
      {
        q: "What is a low doc business loan?",
        a: "A business loan assessed on alternative evidence — usually six to twelve months of business bank statements plus BAS — instead of full financial statements and tax returns.",
      },
      {
        q: "How much can I borrow with a low doc business loan?",
        a: "Unsecured facilities commonly run to a few hundred thousand dollars; secured against property, substantially more. Turnover, trading history and ATO position all shape the limit.",
      },
      {
        q: "Do I need property security?",
        a: "Not always. Unsecured low doc facilities exist. Security generally reduces the rate and increases the amount available.",
      },
      {
        q: "Does an ATO debt stop me borrowing?",
        a: "Not necessarily. An ATO debt on a payment plan being met is acceptable to several lenders, and refinancing ATO debt into a structured facility is a common reason people come to us.",
      },
    ],
    formType: "commercial",
    related: ["business-loans", "working-capital-cashflow", "equipment-finance"],
  },

  {
    slug: "business-loans",
    section: "commercial-finance",
    tier: 2,
    title: "Business Loan Broker | Independent Comparison",
    metaDescription:
      "Business loans compared across bank and non-bank lenders. Cashflow, expansion, equipment and business purchase. Independent brokers, ACL 515382.",
    primaryKeyword: "business loan broker",
    volume: 1900,
    kd: 35,
    eyebrow: "Business loans",
    h1: "Business loans, arranged by an independent broker",
    intro:
      "A business banker can offer what their bank sells. We compare secured and unsecured term loans, lines of credit and cashflow facilities across the market.",
    heroImage: "/brand/photography/svc-business.webp",
    heroAlt: "Business colleagues together",
    angle: {
      heading: "Your bank knows one product. There are dozens.",
      body: "A business banker can only offer what is on their own shelf, which is usually an overdraft and a term loan secured by your home. There are lenders funding equipment, invoices, stock and expansion on their own terms — and no single bank will tell you about the ones that are not theirs.",
    },
    explainer: {
      heading: "What a business loan is",
      body: "An umbrella term covering several very different products: unsecured term loans, secured term loans, overdrafts and lines of credit, and facilities secured by property or equipment. Which one is right depends on what the money is for and how quickly it turns back into cash. Matching the product to the purpose matters more than shaving the rate.",
      steps: [
        {
          n: "01",
          title: "Start with what the money is for",
          body: "Equipment, stock, a hire, a tax bill or a shortfall. The purpose decides the product, and the product decides the price.",
        },
        {
          n: "02",
          title: "We compare the lenders who fund it",
          body: "Bank and non-bank, secured and unsecured, so you can see the real trade-off between cost and speed.",
        },
        {
          n: "03",
          title: "Settle with the terms explained",
          body: "You will know the rate, the fees, the term and what happens if you repay early, before you sign.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Trading at least two years",
        "ABN and GST registered",
        "Expansion, equipment, cashflow or acquisition",
        "Property security preferred, not required",
      ],
      notForThem: [
        "Startups without trading history",
        "Business purchase without a 50% deposit",
      ],
    },
    advantages: [
      {
        icon: "bank",
        title: "Bank and non-bank in one comparison",
        body: "Rates, terms and covenants differ enormously between the two. Seeing both is the only way to know what the bank's offer is really worth.",
      },
      {
        icon: "note-01",
        title: "The right facility, not just a loan",
        body: "A term loan, an overdraft and an invoice facility solve different problems. Matching the structure to the need matters more than the rate.",
      },
      {
        icon: "clock",
        title: "One application, several lenders",
        body: "We package once and present to the lenders most likely to say yes, rather than you applying repeatedly and marking your file.",
      },
    ],
    faqs: [
      {
        q: "How much can my business borrow?",
        a: "Unsecured facilities are typically limited by turnover and servicing; secured lending by the property value. Two businesses with identical turnover can receive very different answers depending on security and industry.",
      },
      {
        q: "What do I need to apply for a business loan?",
        a: "ABN and GST registration, six to twelve months of business bank statements, recent BAS, and details of existing facilities. Full financials are needed for some lenders but not all.",
      },
      {
        q: "Can I get a business loan to buy a business?",
        a: "Yes, though most lenders require a deposit of around 50% of the purchase price unless there's property security available.",
      },
    ],
    formType: "commercial",
    related: ["low-doc-business-loans", "commercial-property-loans", "working-capital-cashflow"],
  },

  {
    slug: "commercial-property-loans",
    section: "commercial-finance",
    tier: 2,
    title: "Commercial Property Loans | Independent Brokers",
    metaDescription:
      "Finance for offices, retail, industrial and warehouse property. Owner-occupied and investment. Independent brokers, ACL 515382.",
    primaryKeyword: "commercial property loan",
    volume: 1600,
    kd: 28,
    eyebrow: "Commercial property",
    h1: "Commercial property loans for investors and owner-occupiers",
    intro:
      "Shorter terms, lower LVRs, real covenants and a valuation that can change the deal late. Knowing that before you sign the contract is the difference.",
    heroImage: "/brand/photography/svc-commercial-property.webp",
    heroAlt: "A professional team in an urban setting",
    angle: {
      heading: "Commercial lending doesn't work like a home loan.",
      body: "Borrowers who have only ever bought houses are routinely caught by the deposit, the shorter term and the valuation coming in under contract. None of it is unusual in commercial — it is just nothing like the residential process they are expecting.",
    },
    explainer: {
      heading: "What a commercial property loan is",
      body: "Finance secured against commercial real estate: offices, retail, industrial units, warehouses. Expect to contribute around 30 to 35 per cent, terms shorter than residential, and assessment that weighs the lease and the tenant as heavily as your own income. Owner-occupiers buying premises for their own business are often treated more favourably than passive investors.",
      steps: [
        {
          n: "01",
          title: "Bring the contract and the lease",
          body: "The tenant, the lease term and the property type drive the assessment as much as your income does.",
        },
        {
          n: "02",
          title: "We test it with commercial lenders",
          body: "Appetite varies sharply by asset class and location. We find out who is lending on yours before you are committed.",
        },
        {
          n: "03",
          title: "Settle with the structure right",
          body: "Interest only, principal and interest, or a mix — set up around how the property is meant to perform.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Office, retail, industrial or warehouse",
        "Owner-occupied or investment",
        "Trading business or established investor",
        "Deposit typically 20% to 35%",
      ],
      notForThem: [
        "Specialised security most lenders won't take",
        "Development finance — a different product",
      ],
    },
    advantages: [
      {
        icon: "bank",
        title: "Valuation risk handled early",
        body: "A commercial valuation can land well under contract price and reset the deposit. We pressure-test the number before you're committed.",
      },
      {
        icon: "note-01",
        title: "Covenants read properly",
        body: "Interest cover ratios and annual reviews are where commercial loans bite later. We flag them before you sign, not after.",
      },
      {
        icon: "percent",
        title: "Terms compared honestly",
        body: "Commercial terms are often three to five years with a review, not thirty. What happens at review matters as much as today's rate.",
      },
    ],
    faqs: [
      {
        q: "How much deposit do I need for a commercial property?",
        a: "Typically 20% to 35% depending on property type, tenant quality and whether you'll occupy it. Owner-occupied purchases often achieve better LVRs than investments.",
      },
      {
        q: "What term do commercial property loans run for?",
        a: "Commonly three to fifteen years, frequently with a review at intervals. Thirty-year terms are rare in commercial lending.",
      },
      {
        q: "Can I buy commercial property through my SMSF?",
        a: "Yes, and business premises are one of the more common SMSF purchases. The fund needs to be established and your accountant or adviser involved — see our SMSF page.",
      },
    ],
    formType: "commercial",
    related: ["business-loans", "low-doc-business-loans", "working-capital-cashflow"],
  },

  {
    slug: "working-capital-cashflow",
    section: "commercial-finance",
    tier: 3,
    title: "Working Capital & Cashflow Finance",
    metaDescription:
      "Cashflow facilities, overdrafts and invoice finance for businesses waiting on payment. Independent brokers, ACL 515382.",
    primaryKeyword: "working capital loan",
    volume: 590,
    kd: 52,
    eyebrow: "Working capital",
    h1: "Working capital and cash flow finance for business",
    intro:
      "Profitable businesses fail on timing, not margin. Cashflow facilities bridge the gap between doing the work and being paid for it.",
    heroImage: "/brand/photography/svc-working-capital.webp",
    heroAlt: "A handshake closing a finance agreement",
    angle: {
      heading: "The work is done. The invoice isn't paid.",
      body: "Profitable businesses fail on timing, not on margin. You have delivered, you have invoiced, and the terms say sixty days — but wages, fuel and the ATO do not wait sixty days. That gap is a funding problem, not a trading problem.",
    },
    explainer: {
      heading: "What working capital finance is",
      body: "Short-term facilities that bridge the gap between paying out and being paid: overdrafts, lines of credit, invoice finance that advances against unpaid invoices, and short-term unsecured loans. The right one depends on whether the gap is a one-off or a permanent feature of your terms of trade.",
      steps: [
        {
          n: "01",
          title: "Show us the cash flow gap",
          body: "Bank statements and your debtor ledger. We are looking at the timing, not just the totals.",
        },
        {
          n: "02",
          title: "We match the facility to the gap",
          body: "A recurring gap wants a line of credit or invoice finance. A one-off wants a short-term loan. They are priced very differently.",
        },
        {
          n: "03",
          title: "Draw it when you need it",
          body: "Most facilities let you draw and repay as invoices land, so you only pay for what you actually use.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Trading at least two years",
        "ABN and GST registered",
        "Seasonal or invoice-driven cashflow",
      ],
      notForThem: [
        "Under two years trading",
        "Losses without a clear recovery plan",
      ],
    },
    advantages: [
      {
        icon: "sync",
        title: "Facility matched to the cycle",
        body: "An overdraft, an invoice facility and a term loan solve different timing problems. The wrong one costs more than it saves.",
      },
      {
        icon: "clock",
        title: "Fast where it has to be",
        body: "Cashflow gaps have deadlines. Several lenders can fund within days on bank statements alone.",
      },
      {
        icon: "check",
        title: "We'll say when it's the wrong fix",
        body: "Sometimes the answer is a conversation with your debtors, not a facility. We'll tell you when that's what we think.",
      },
    ],
    faqs: [
      {
        q: "What is invoice finance?",
        a: "A facility that advances a percentage of your unpaid invoices, usually 70% to 85%, with the balance paid when the customer settles, less a fee.",
      },
      {
        q: "How fast can working capital be arranged?",
        a: "Some lenders fund within a few business days on bank statements alone. More structured facilities take longer.",
      },
    ],
    formType: "commercial",
    related: ["low-doc-business-loans", "business-loans", "equipment-finance"],
  },
];
