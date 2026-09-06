import type { ServicePage } from "@/data/types";

export const homeLoanServices: ServicePage[] = [
  {
    slug: "refinance",
    section: "home-loans",
    tier: 1,
    title: "Refinance Your Home Loan | Independent Brokers",
    metaDescription:
      "Independent refinance brokers. We check what you're on now against what you could be on, and tell you straight whether moving is worth the switching costs. ACL 515382.",
    primaryKeyword: "refinance home loan",
    volume: 8100,
    kd: 42,
    eyebrow: "Refinance",
    h1: "Refinance your home loan with an independent broker",
    intro:
      "Lenders reserve their sharpest pricing for people who are leaving. We find out what you're actually on, what you could be on, and whether the difference survives the switching costs.",
    heroImage: "/brand/photography/svc-refinance.webp",
    heroAlt: "A couple at home",
    angle: {
      heading: "Your rate crept up and nobody called.",
      body: "Lenders price sharply to win you and quietly less well to keep you. The gap between what a new customer is offered and what an existing one pays is real, it widens every year you stay, and nobody at the bank is going to ring and point it out.",
    },
    explainer: {
      heading: "What refinancing is",
      body: "Moving your loan to a different lender, or renegotiating with your current one, to get a better rate or restructure the debt. It is worth checking whenever your rate has drifted, your fixed term is ending, your property has gained value, or your income has changed. The switch costs are usually a few hundred dollars, and it is only worth doing when the saving clearly beats them.",
      steps: [
        {
          n: "01",
          title: "Send your current statement",
          body: "The rate, the balance and the lender. That is enough for us to tell you whether there is anything in it.",
        },
        {
          n: "02",
          title: "We compare against the market",
          body: "Including what your current lender will do to keep you, which is sometimes the fastest win available.",
        },
        {
          n: "03",
          title: "Switch, or stay on better terms",
          body: "We handle the discharge and the new application. If moving is not worth it, we will tell you that instead.",
        },
      ],
    },
    qualify: {
      forThem: [
        "You've had the same loan more than two years",
        "You're on a variable rate you haven't checked recently",
        "Your fixed term is ending in the next six months",
        "You want to consolidate other debt into the loan",
        "You've built equity and want to use it",
      ],
      notForThem: [
        "You only want the single cheapest rate in the market",
        "You refinanced in the last six months",
        "You're a non-resident or on a temporary visa",
      ],
    },
    advantages: [
      {
        icon: "percent",
        title: "We price the whole move, not just the rate",
        body: "Discharge fees, application fees, valuation, and whether your LMI is portable. A sharper rate that costs you $4,000 to reach isn't a saving for two years.",
      },
      {
        icon: "bank",
        title: "Our own credit licence",
        body: "We hold an ACL rather than sitting on a restricted aggregator panel, so we reach lenders other brokers can't. You'll be told which ones we compared and why.",
      },
      {
        icon: "clock",
        title: "We do the leaving",
        body: "Discharge forms, the outgoing lender's retention call, the new lender's conditions. You sign twice and answer the phone once.",
      },
      {
        icon: "check",
        title: "We'll tell you to stay",
        body: "If your current loan is already competitive, that's the answer you get. It costs us the deal and it's why people refer us.",
      },
    ],
    objections: [
      {
        q: "My bank offered me a discount to stay. Should I take it?",
        a: "Sometimes — a retention offer is real money and it costs nothing to accept. What it usually isn't is the sharpest number available to you. We'll tell you how the retention offer compares to what we can reach, and if staying wins, stay.",
      },
      {
        q: "How long does refinancing actually take?",
        a: "Typically one to two weeks to formal approval, then discharge and settlement on top — the outgoing lender controls that part. We'll give you a realistic date at the start rather than an optimistic one.",
      },
    ],
    faqs: [
      {
        q: "When should you refinance a home loan?",
        a: "The usual triggers are a fixed term ending, two or more years on the same variable rate, a change in income or family circumstances, or wanting to access equity. The test is whether the saving over the next two to three years exceeds the total cost of switching.",
      },
      {
        q: "What does it cost to refinance?",
        a: "Generally a discharge fee from the outgoing lender, and possibly an application or valuation fee at the new one. Many lenders waive some of these. There's no fee from us on a standard home loan refinance — the lender pays our commission on settlement.",
      },
      {
        q: "Will refinancing hurt my credit score?",
        a: "A formal application creates an enquiry on your file. We shortlist before anything is lodged, so you don't accumulate several enquiries while working out where you fit.",
      },
      {
        q: "Can I refinance with bad credit?",
        a: "Often, yes — through specialist and non-bank lenders rather than the majors. Clean credit is preferred but not essential. Current defaults make it harder and we'll tell you honestly where you stand on the first call.",
      },
      {
        q: "Can I consolidate other debts into my home loan?",
        a: "Usually. Personal loans, car loans and credit cards can be rolled in, which lowers the monthly repayment. The trade-off is paying short-term debt over a long term, so we'll show you the total interest cost, not just the new monthly figure.",
      },
      {
        q: "How much equity do I need to refinance?",
        a: "Most lenders want you under 80% of the property's value to avoid lenders mortgage insurance. Refinancing above 80% is possible but LMI usually applies again, which often outweighs the rate saving.",
      },
    ],
    formType: "residential",
    related: ["self-employed", "investment-property", "debt-consolidation"],
  },

  {
    slug: "self-employed",
    section: "home-loans",
    tier: 1,
    title: "Self-Employed Home Loans | Low Doc & Alt Doc",
    metaDescription:
      "Home loans for the self-employed. Low doc and alt doc lenders read your numbers differently to the majors. Independent brokers, ACL 515382.",
    primaryKeyword: "low doc home loan",
    volume: 880,
    kd: 24,
    eyebrow: "Self-employed & low doc",
    h1: "Low doc home loans for self-employed borrowers",
    intro:
      "A major bank wants two years of tax returns that show a healthy profit. A good accountant's job is to make that profit look small. That contradiction is the whole problem, and it has a solution.",
    heroImage: "/brand/photography/svc-self-employed.webp",
    heroAlt: "A self-employed business owner",
    angle: {
      heading: "You work for yourself and the bank said no.",
      body: "Business owners are the borrowers banks understand worst. Income is written down legitimately for tax, the last return is eighteen months old, and a computer reads that as risk. The same file, in front of a lender who assesses self-employed income properly, is often a straightforward approval.",
    },
    explainer: {
      heading: "What a low doc home loan is",
      body: "A home loan assessed on BAS, business bank statements or an accountant's declaration instead of two years of tax returns. Aimed at self-employed borrowers whose returns do not reflect what the business actually earns, or who are not yet two full years in. Expect a slightly higher rate and more deposit than full doc, and treat it as a stepping stone you refinance out of.",
      steps: [
        {
          n: "01",
          title: "Send what you do have",
          body: "BAS, business statements, or a letter from your accountant. Two years of tax returns are not the only route.",
        },
        {
          n: "02",
          title: "We take it to lenders who assess it properly",
          body: "Some lenders read add-backs and retained profit correctly. Most branches do not. That difference is the whole game.",
        },
        {
          n: "03",
          title: "Buy now, refinance later",
          body: "Get into the property on low doc terms, then move to a full doc rate once the returns support it.",
        },
      ],
    },
    qualify: {
      forThem: [
        "You've been trading at least twelve months",
        "Your returns don't reflect what the business actually earns",
        "You have BAS, bank statements or an accountant's letter",
        "You're a sole trader, company or trust",
        "A bank has already declined you",
      ],
      notForThem: [
        "You've been trading under twelve months with no other income",
        "You have current defaults or unresolved credit issues",
        "You're a non-resident or on a temporary visa",
      ],
    },
    advantages: [
      {
        icon: "file-copy",
        title: "Alt doc means different evidence, not no evidence",
        body: "Twelve months of BAS, six months of business bank statements, or a signed accountant's declaration. Several lenders accept one of these instead of two years of returns.",
      },
      {
        icon: "bank",
        title: "Lenders the majors don't compete with",
        body: "Non-bank and specialist lenders price self-employed risk properly instead of declining it. Holding our own credit licence is what gets us to them.",
      },
      {
        icon: "search",
        title: "We add back what your accountant took out",
        body: "Depreciation, one-off expenses, additional superannuation, interest on debts being refinanced. Presented correctly, your assessable income is often far higher than your taxable income.",
      },
      {
        icon: "check",
        title: "A decline isn't a verdict",
        body: "Most self-employed declines are a presentation problem, not a borrowing-capacity problem. If a deal has already fallen over once, that's the work we're best at.",
      },
    ],
    objections: [
      {
        q: "Do low doc loans have much higher rates?",
        a: "Usually somewhat higher than a full-doc major bank loan, though the gap has narrowed. Many clients refinance to a standard rate after two years of returns exist. We'll show you both the alt doc rate now and the likely rate later.",
      },
      {
        q: "I've only been self-employed for eighteen months.",
        a: "That's often enough. Several lenders assess from twelve months of trading, particularly where you were employed in the same industry beforehand. The majors won't tell you this because they can't help.",
      },
    ],
    faqs: [
      {
        q: "What is a low doc home loan?",
        a: "A loan assessed on alternative income evidence — BAS statements, business bank statements or an accountant's declaration — rather than two years of personal tax returns. It exists for borrowers whose returns don't reflect their real capacity.",
      },
      {
        q: "How long do I need to be self-employed to get a home loan?",
        a: "Most banks want two years. Several specialist lenders will assess from twelve months of trading, and a few will consider less where you have a strong history in the same industry.",
      },
      {
        q: "What documents do I need for a self-employed home loan?",
        a: "Typically an ABN and GST registration, twelve months of BAS or six months of business bank statements, identification, and details of existing debts. An accountant's letter can replace some of it.",
      },
      {
        q: "Can I get a home loan with one year of tax returns?",
        a: "Yes, with the right lender. One year of returns plus BAS or bank statements is an accepted combination at several lenders, particularly where the business is established and the industry is stable.",
      },
      {
        q: "Why did the bank decline my self-employed application?",
        a: "Most commonly because taxable income after deductions doesn't support the loan on that lender's calculator. It's a policy outcome, not a judgment on the business — and a different lender's calculator may reach a different answer on identical figures.",
      },
    ],
    formType: "residential",
    related: ["refinance", "investment-property", "low-doc-business-loans"],
  },

  {
    slug: "doctors-medical-professionals",
    section: "home-loans",
    tier: 1,
    title: "Home Loans for Doctors | Up to 95% No LMI",
    metaDescription:
      "Medical professionals can borrow up to 95% with no lenders mortgage insurance through the major banks. Specialists, registrars and residents all qualify. ACL 515382.",
    primaryKeyword: "home loan for doctors",
    volume: 260,
    kd: 18,
    eyebrow: "Medical professionals",
    h1: "Home loans for doctors and medical professionals",
    intro:
      "The major banks waive lenders mortgage insurance for medical professionals up to 95% of the property value. On an $900,000 purchase that's tens of thousands of dollars nobody mentions unless you ask.",
    heroImage: "/brand/photography/svc-doctors.webp",
    heroAlt: "A medical professional at work",
    angle: {
      heading: "You're a doctor paying LMI you don't owe.",
      body: "Several lenders will waive lenders mortgage insurance entirely for medical professionals borrowing up to 95 per cent. On an $800,000 purchase that is tens of thousands of dollars — and it is not advertised, because a waiver is worth more to the bank kept quiet than given away.",
    },
    explainer: {
      heading: "What the medical professional waiver is",
      body: "A concession offered by certain lenders to specified medical occupations — GPs, specialists, surgeons, dentists, and at some lenders veterinarians and optometrists — allowing borrowing up to 90 or 95 per cent of the property value with no LMI. Eligibility turns on your registration and occupation code, and each lender's list of accepted occupations is different.",
      steps: [
        {
          n: "01",
          title: "Confirm your occupation and registration",
          body: "AHPRA registration and your exact occupation decide which lenders' waiver lists you appear on.",
        },
        {
          n: "02",
          title: "We check the waiver lists",
          body: "The lists differ by lender and change without notice. We check them at the time you apply, not from memory.",
        },
        {
          n: "03",
          title: "Borrow to 95 per cent with no LMI",
          body: "Where you qualify, that is a five-figure saving kept in your pocket rather than paid to an insurer.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Specialists, GPs, registrars and residents",
        "Dentists, veterinarians and optometrists at some lenders",
        "Permanent residents and citizens",
        "Buying a home, investing, or refinancing",
        "Practice and equipment finance also in scope",
      ],
      notForThem: [
        "Temporary visa holders",
        "Students not yet registered",
        "Allied health roles outside each lender's approved list",
      ],
    },
    advantages: [
      {
        icon: "percent",
        title: "Up to 95% with no LMI",
        body: "The waiver is the single largest saving available to you. On a $900,000 purchase at 90%, LMI would typically run into five figures. Waived, that stays in your pocket.",
      },
      {
        icon: "bank",
        title: "The waiver isn't uniform",
        body: "Each lender has its own approved occupation list, LVR cap and minimum income. A registrar accepted at one bank is declined at another. Knowing which is which is most of the value here.",
      },
      {
        icon: "clock",
        title: "Built around your roster",
        body: "We work by phone, email and e-signature. Nothing here requires you to take a morning off to sit in a branch.",
      },
      {
        icon: "wallet-1",
        title: "Practice finance too",
        body: "Buying into a partnership, fitting out rooms or financing equipment sits alongside the home loan. Same broker, one conversation.",
      },
    ],
    objections: [
      {
        q: "Is the no-LMI waiver a marketing gimmick?",
        a: "No. It's a documented policy at several major lenders based on the default rates of medical professions. The catch is that the approved occupation lists, LVR caps and income thresholds differ at every lender.",
      },
      {
        q: "I'm still a registrar. Do I qualify?",
        a: "At several lenders, yes — registrars and residents are on the approved lists, sometimes with a lower LVR cap than specialists. It's worth checking rather than assuming you have to wait until you're a consultant.",
      },
    ],
    faqs: [
      {
        q: "Which professions qualify for an LMI waiver?",
        a: "Medical practitioners, specialists, dentists and veterinarians at most lenders, with some also including optometrists, pharmacists and chiropractors. Accountants and lawyers have their own separate waivers at lower LVR caps.",
      },
      {
        q: "How much can doctors borrow without LMI?",
        a: "Commonly up to 95% of the property value at the majors, though some lenders cap the waiver at 90% for certain roles. Minimum income requirements sometimes apply.",
      },
      {
        q: "How much is lenders mortgage insurance?",
        a: "It varies by loan size and LVR, and is typically a four to five figure one-off premium. On a high-LVR purchase it's often the single largest cost in the transaction — which is why the waiver matters.",
      },
      {
        q: "Can I use the waiver on an investment property?",
        a: "At several lenders, yes, sometimes at a lower LVR cap than for an owner-occupied purchase. Policy differs by lender and changes periodically.",
      },
      {
        q: "Do I need a deposit at all?",
        a: "Yes — the waiver removes the insurance, not the deposit. Most waivers still require 5% to 10% of the purchase price plus costs, and genuine savings requirements can apply.",
      },
    ],
    formType: "professional",
    related: ["accountants-lawyers", "investment-property", "refinance"],
  },

  {
    slug: "accountants-lawyers",
    section: "home-loans",
    tier: 1,
    title: "Home Loans for Accountants & Lawyers | LMI Waivers",
    metaDescription:
      "Accountants, lawyers and other qualifying professionals can access LMI waivers up to 90% LVR. Independent brokers who know which lender accepts which qualification. ACL 515382.",
    primaryKeyword: "home loan for lawyers",
    volume: 170,
    kd: 22,
    eyebrow: "Professionals",
    h1: "Home loans for accountants, lawyers and other professionals",
    intro:
      "Accountants, lawyers and several other qualified professions have their own lenders mortgage insurance waivers. Smaller than the medical waiver, still worth thousands, and rarely volunteered.",
    heroImage: "/brand/photography/svc-professionals.webp",
    heroAlt: "A professional at their workplace",
    angle: {
      heading: "Your profession is worth a discount nobody offered you.",
      body: "The LMI waiver is not only for doctors. Accountants, lawyers, actuaries and a handful of other professions qualify at particular lenders — usually with a minimum income and membership of the relevant professional body. It is one of the few genuine advantages that goes unclaimed simply because nobody mentions it.",
    },
    explainer: {
      heading: "What the professional waiver is",
      body: "Certain lenders waive lenders mortgage insurance for members of specified professions borrowing up to 85 or 90 per cent. Typical requirements are current membership of a recognised body — CA ANZ, CPA Australia, a state law society — and an income threshold. Which professions and which thresholds vary by lender and are reviewed regularly.",
      steps: [
        {
          n: "01",
          title: "Tell us your profession and body",
          body: "Membership of a recognised body is normally the qualifying test, alongside an income floor.",
        },
        {
          n: "02",
          title: "We check who is honouring it now",
          body: "These lists are quietly changed. We check them live rather than trusting last year's version.",
        },
        {
          n: "03",
          title: "Keep the LMI premium",
          body: "Where a waiver applies, that premium stays with you instead of going to an insurer.",
        },
      ],
    },
    qualify: {
      forThem: [
        "CA, CPA and IPA qualified accountants",
        "Admitted legal practitioners",
        "Some lenders include actuaries and engineers",
        "Permanent residents and citizens",
        "Employed or in partnership",
      ],
      notForThem: [
        "Temporary visa holders",
        "Recently qualified without the required membership",
        "Roles outside each lender's approved list",
      ],
    },
    advantages: [
      {
        icon: "percent",
        title: "Typically up to 90% with no LMI",
        body: "Lower than the medical cap, but on a $1.2m purchase the waived premium is still a five figure saving.",
      },
      {
        icon: "note-01",
        title: "Membership is the gate",
        body: "Most lenders require current CA, CPA, IPA or practising-certificate status. Which body is accepted differs by lender, and that detail decides the outcome.",
      },
      {
        icon: "bank",
        title: "Partnership income understood",
        body: "Partnership distributions, trust income and equity buy-ins confuse standard assessment. Presented properly they're straightforward.",
      },
      {
        icon: "check",
        title: "One comparison, honestly explained",
        body: "We'll show you which lenders offer the waiver for your qualification and what each costs after the discount, not just the headline rate.",
      },
    ],
    faqs: [
      {
        q: "Do accountants get LMI waivers?",
        a: "Yes, at several lenders — usually up to 90% of the property value, subject to holding current CA, CPA or IPA membership. The approved list and LVR cap differ by lender.",
      },
      {
        q: "Do lawyers get LMI waivers?",
        a: "Admitted legal practitioners qualify at most of the lenders offering professional waivers, typically up to 90% LVR and sometimes with a minimum income requirement.",
      },
      {
        q: "Is the professional waiver as good as the medical one?",
        a: "Not quite. Medical professionals commonly reach 95% with no LMI; accountants and lawyers are usually capped at 90%. Both remove the premium entirely within their cap.",
      },
      {
        q: "What if I'm a partner rather than an employee?",
        a: "That's fine, and often stronger. Partnership distributions and retained profits are accepted income at most lenders when presented with the right evidence.",
      },
    ],
    formType: "professional",
    related: ["doctors-medical-professionals", "investment-property", "refinance"],
  },

  {
    slug: "investment-property",
    section: "home-loans",
    tier: 2,
    title: "Investment Property Loans | Independent Brokers",
    metaDescription:
      "Investment property loans structured for the portfolio you're building, not just the property you're buying. Independent brokers, ACL 515382.",
    primaryKeyword: "investment property loan",
    volume: 1300,
    kd: 29,
    eyebrow: "Investment",
    h1: "Investment property loans for Australian investors",
    intro:
      "Serviceability, existing debt and how the last loan was structured all decide whether there's a third. We structure for the portfolio, not just the purchase in front of you.",
    heroImage: "/brand/photography/svc-investment.webp",
    heroAlt: "A couple outside their investment property",
    angle: {
      heading: "The second property is harder than the first.",
      body: "The first investment usually goes through on the strength of your salary. The second and third run into serviceability: every lender assesses your existing debt at an inflated buffer rate, and they do not all assess rental income the same way. That is where a portfolio stalls, and where lender choice matters most.",
    },
    explainer: {
      heading: "What an investment property loan is",
      body: "A loan secured against a property you intend to rent out. Assessment counts rental income — but at only 70 to 80 per cent of it, and every lender differs on how much they shade existing debts and negative gearing. Interest-only is common for tax reasons, though it costs more overall. Structure matters here more than headline rate, particularly across several properties.",
      steps: [
        {
          n: "01",
          title: "Map the whole portfolio",
          body: "Existing loans, rents and equity. Serviceability, not deposit, is what usually caps the next purchase.",
        },
        {
          n: "02",
          title: "We find the lender who assesses you best",
          body: "The same file can differ by hundreds of thousands in borrowing capacity between lenders. That gap is the opportunity.",
        },
        {
          n: "03",
          title: "Structure it to keep buying",
          body: "Loan splits, ownership and interest-only periods set up so the next purchase is still possible.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Buying your first or next investment property",
        "Household income $100,000 or more",
        "5% deposit or usable equity",
        "Employed, self-employed or professional",
      ],
      notForThem: [
        "Non-residents and temporary visa holders",
        "Development or commercial property — see commercial finance",
      ],
    },
    advantages: [
      {
        icon: "home-1",
        title: "Structured so there can be a next one",
        body: "Cross-collateralising two properties is convenient now and a problem later. We keep securities separate wherever it's sensible.",
      },
      {
        icon: "percent",
        title: "Interest-only where it genuinely helps",
        body: "Useful for cashflow and tax position, expensive over a full term. We'll model both rather than defaulting to one.",
      },
      {
        icon: "search",
        title: "Serviceability across lenders",
        body: "Every lender assesses rental income and existing debt differently. The same borrower can vary by hundreds of thousands in capacity.",
      },
      {
        icon: "user-group",
        title: "We work with your accountant",
        body: "Ownership structure and tax treatment are their call. We build the finance to fit the structure they recommend.",
      },
    ],
    faqs: [
      {
        q: "How much deposit do I need for an investment property?",
        a: "Commonly 10% to 20% plus costs. Below 20% lenders mortgage insurance usually applies. Equity in an existing property can be used instead of cash.",
      },
      {
        q: "Should I use interest-only on an investment loan?",
        a: "It improves cashflow and may suit your tax position, but you pay more interest across the full term and rates are usually higher. It's a decision to make with your accountant, and we'll model the numbers both ways.",
      },
      {
        q: "How do lenders treat rental income?",
        a: "Most count 70% to 80% of gross rent to allow for vacancy and costs. The exact shading varies by lender and directly affects how much you can borrow.",
      },
      {
        q: "Can I use equity instead of a cash deposit?",
        a: "Usually. Releasing equity from an existing property is the most common way people fund the next purchase. We'll structure it to avoid tying the two properties together unnecessarily.",
      },
    ],
    formType: "residential",
    related: ["refinance", "self-employed", "construction"],
  },

  {
    slug: "construction",
    section: "home-loans",
    tier: 2,
    title: "Construction Loans | Build & Owner Builder Finance",
    metaDescription:
      "Construction and owner builder loans with progressive drawdowns. We manage the lender through each stage so the builder gets paid on time. ACL 515382.",
    primaryKeyword: "construction loan broker",
    volume: 320,
    kd: 10,
    eyebrow: "Construction",
    h1: "Construction loans for building and major renovation",
    intro:
      "Progress payments, valuations at each stage and a builder waiting to be paid. The loan itself is simple — the administration is what fails, and that's the part we run.",
    heroImage: "/brand/photography/svc-construction.webp",
    heroAlt: "A couple outside a newly built home",
    angle: {
      heading: "Building is where finance usually goes wrong.",
      body: "Construction lending fails on process, not on price. Progress payments have to line up with the builder's schedule, valuations are done on plans rather than bricks, and a variation halfway through can stall the whole draw. Getting the structure right at the start is what stops a build stopping.",
    },
    explainer: {
      heading: "What a construction loan is",
      body: "A loan released in stages as the build progresses — usually slab, frame, lock-up, fixing and completion — rather than as one lump at settlement. You pay interest only on what has been drawn. The lender values the property on completion from the plans and fixed-price contract, so a licensed builder and a proper contract are effectively mandatory.",
      steps: [
        {
          n: "01",
          title: "Bring the contract and the plans",
          body: "A fixed-price contract with a licensed builder is what lenders will actually value against.",
        },
        {
          n: "02",
          title: "We align the draws to the build",
          body: "Progress payments matched to the builder's schedule, so the trades are never waiting on the bank.",
        },
        {
          n: "03",
          title: "Draw stage by stage",
          body: "We manage each valuation and release, and interest is only charged on what has been drawn.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Fixed-price building contract with a licensed builder",
        "Knockdown rebuild or house and land",
        "Owner builders at selected lenders",
        "Land already owned or being purchased",
      ],
      notForThem: [
        "Developments of more than two dwellings — see commercial finance",
        "Cost-plus contracts at most lenders",
      ],
    },
    advantages: [
      {
        icon: "sync",
        title: "We chase the progress payments",
        body: "Each stage needs an invoice, an inspection and a drawdown. We run that cycle so your builder isn't waiting and you aren't calling the bank.",
      },
      {
        icon: "note-01",
        title: "Interest only during the build",
        body: "You pay interest on what's drawn, not the full loan, then move to principal and interest at completion.",
      },
      {
        icon: "help",
        title: "Owner builder is possible",
        body: "Fewer lenders, lower LVR, more evidence — but it exists. Most brokers say no because it's harder to arrange.",
      },
      {
        icon: "check",
        title: "Contract reviewed before lodgement",
        body: "Most construction declines come from the building contract, not the borrower. We read it before it goes anywhere.",
      },
    ],
    faqs: [
      {
        q: "How does a construction loan work?",
        a: "The loan is approved in full but released in stages against your builder's invoices — typically slab, frame, lock-up, fit-out and completion. You pay interest only on the amount drawn so far.",
      },
      {
        q: "Can I get a loan as an owner builder?",
        a: "Yes, at a smaller group of lenders and usually at a lower LVR. You'll need owner builder permits, a detailed cost breakdown and evidence of relevant experience.",
      },
      {
        q: "What happens if the build runs over time?",
        a: "Most construction loans allow a set period, commonly twelve months, before converting. Extensions are usually possible but need to be requested rather than assumed. We track the date.",
      },
    ],
    formType: "residential",
    related: ["investment-property", "refinance", "bridging-finance"],
  },

  {
    slug: "bridging-finance",
    section: "home-loans",
    tier: 3,
    title: "Bridging Loans | Buy Before You Sell",
    metaDescription:
      "Bridging finance so you can buy the next home before the current one settles. Short term, interest capitalised, exit planned from day one. ACL 515382.",
    primaryKeyword: "bridging loan",
    volume: 4400,
    kd: 43,
    eyebrow: "Bridging",
    h1: "Bridging loans for buying before you sell",
    intro:
      "Bridging finance covers the overlap. It's short term and it has to be planned backwards from how it ends, which is the part people skip.",
    heroImage: "/brand/photography/svc-bridging.webp",
    heroAlt: "A couple outside their home",
    angle: {
      heading: "You found the next house before you sold this one.",
      body: "The right house rarely appears on the schedule that suits your sale. Bridging finance buys you the weeks in between — but it is expensive, and it needs a credible exit before you take it, not after.",
    },
    explainer: {
      heading: "What a bridging loan is",
      body: "Short-term finance covering the gap between buying the next property and selling the current one, usually for six to twelve months. The lender looks at your peak debt — both properties combined — and at the end debt left once the sale settles. Most bridging is interest-only or capitalised, meaning nothing is paid until the sale completes.",
      steps: [
        {
          n: "01",
          title: "Show us both properties",
          body: "The purchase, the existing property and a realistic sale figure. The end debt is what the lender is actually assessing.",
        },
        {
          n: "02",
          title: "We agree the exit before you start",
          body: "A bridge without a credible exit is the one that hurts. We would rather say no early than watch it go wrong.",
        },
        {
          n: "03",
          title: "Settle, sell, close the bridge",
          body: "The sale proceeds pay out the bridge and you carry on with the ordinary loan underneath it.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Buying before selling",
        "Substantial equity in the outgoing property",
        "A realistic sale timeframe",
      ],
      notForThem: [
        "No clear exit or sale plan",
        "Limited equity in the existing property",
      ],
    },
    advantages: [
      {
        icon: "sync",
        title: "Peak debt calculated honestly",
        body: "You need to know the total exposure while you hold both, not just the new loan amount. We model it before you commit.",
      },
      {
        icon: "clock",
        title: "Interest usually capitalised",
        body: "Most bridging loans let interest accrue rather than requiring repayments while you hold both properties.",
      },
      {
        icon: "check",
        title: "The exit comes first",
        body: "We plan how the loan ends before arranging how it starts. Bridging without a clear exit is where this product hurts people.",
      },
    ],
    faqs: [
      {
        q: "How long does bridging finance last?",
        a: "Commonly six months for an existing property sale, up to twelve months for a construction bridge. Terms vary by lender.",
      },
      {
        q: "Do I make repayments during the bridging period?",
        a: "Usually not. Interest is typically capitalised onto the loan and settled when the outgoing property sells.",
      },
      {
        q: "What if my property doesn't sell in time?",
        a: "Extensions are sometimes available, and the loan may convert to a standard mortgage. This is the risk in bridging, and it's why we test a conservative sale price before recommending it.",
      },
    ],
    formType: "residential",
    related: ["refinance", "construction", "investment-property"],
  },

  {
    slug: "debt-consolidation",
    section: "home-loans",
    tier: 3,
    title: "Debt Consolidation Loans | Independent Brokers",
    metaDescription:
      "Roll personal loans, car loans and credit cards into your home loan to cut the monthly repayment. We'll show you the total interest cost, not just the new figure. ACL 515382.",
    primaryKeyword: "debt consolidation loan",
    volume: 5400,
    kd: 37,
    eyebrow: "Debt consolidation",
    h1: "Debt consolidation loans for one simple repayment",
    intro:
      "Consolidating into your home loan lowers the monthly total immediately. It also stretches short-term debt over a long term, so the honest version of this conversation includes both numbers.",
    heroImage: "/brand/photography/svc-debt.webp",
    heroAlt: "A model house with a money bag and calculator",
    angle: {
      heading: "Six repayments, six due dates, one problem.",
      body: "Credit cards, a car loan, a personal loan and buy-now-pay-later charge very different rates on very different days, and the total is often invisible until it is written down in one place. Consolidating can cut the monthly cost sharply — but only if the behaviour that created the debt changes with it.",
    },
    explainer: {
      heading: "What debt consolidation is",
      body: "Rolling several debts into one facility, usually against your home, at a much lower rate. The catch is honest and worth stating: stretching a five-year card balance over twenty-five years can cost more in total interest even at a far lower rate, and it converts unsecured debt into debt secured by your house. Done deliberately, with the cards closed, it works well.",
      steps: [
        {
          n: "01",
          title: "List every debt",
          body: "Balances, rates and minimum repayments. Seeing the true total in one place is usually the useful part.",
        },
        {
          n: "02",
          title: "We show you both totals",
          body: "The new monthly repayment, and the lifetime cost, so you can see the trade-off rather than only the relief.",
        },
        {
          n: "03",
          title: "Consolidate and close the accounts",
          body: "This only works once. We will say so plainly, and we will help you set the term to match.",
        },
      ],
    },
    qualify: {
      forThem: [
        "Equity in your property",
        "Multiple personal loans, car loans or credit cards",
        "Income supports the consolidated loan",
      ],
      notForThem: [
        "Little or no equity",
        "Current defaults on multiple facilities",
      ],
    },
    advantages: [
      {
        icon: "receipt",
        title: "One repayment, one rate",
        body: "Home loan rates sit far below card and personal loan rates. The monthly saving is usually immediate and substantial.",
      },
      {
        icon: "percent",
        title: "We show the total cost",
        body: "A five-year car loan spread over twenty-five years costs more overall even at a lower rate. You'll see both figures before deciding.",
      },
      {
        icon: "check",
        title: "A plan to pay it down faster",
        body: "Consolidation works when the freed-up cashflow goes back into the loan. We'll set the structure up so it can.",
      },
    ],
    faqs: [
      {
        q: "Does debt consolidation hurt your credit score?",
        a: "The application creates an enquiry, and closing accounts changes your file. Most people's position improves over time as balances reduce and repayments are met consistently.",
      },
      {
        q: "How much can I consolidate into my home loan?",
        a: "Subject to equity and serviceability. Most lenders want you under 80% of the property value after consolidation to avoid lenders mortgage insurance.",
      },
      {
        q: "Is consolidating into my mortgage a good idea?",
        a: "It reduces the monthly cost and simplifies your position. It increases total interest unless you keep repaying at close to the old rate. Both are true, and which matters more depends on your situation.",
      },
    ],
    formType: "residential",
    related: ["refinance", "investment-property", "self-employed"],
  },
];
