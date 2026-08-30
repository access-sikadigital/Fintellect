import type { ServicePage } from "@/data/types";

export const assetFinanceServices: ServicePage[] = [
  {
    slug: "equipment-finance",
    section: "asset-finance",
    tier: 2,
    title: "Equipment Finance Broker | New & Used",
    metaDescription:
      "Equipment finance for new and used assets, private or dealer sale. Two-year ABN, GST registered, low doc to $100,000. ACL 515382.",
    primaryKeyword: "equipment finance broker",
    volume: 1000,
    kd: 20,
    eyebrow: "Equipment finance",
    h1: "The gear has to be on site next week.",
    intro:
      "Equipment finance is the fastest lending we do. Two years of ABN, GST registration and the invoice is usually the whole conversation.",
    heroImage: "/brand/photography/svc-equipment.webp",
    heroAlt: "Heavy equipment working on a site",
    qualify: {
      forThem: [
        "Two-year ABN, GST registered",
        "New or used assets within ten years",
        "Private sale or dealer",
        "Low doc comfortable to $100,000",
      ],
      notForThem: [
        "Caravans and boats",
        "Current defaults or credit issues",
        "Assets older than ten years at most lenders",
      ],
    },
    advantages: [
      {
        icon: "clock",
        title: "Approval in days",
        body: "For established ABNs with clean credit, low doc approvals often come back within 24 to 48 hours.",
      },
      {
        icon: "receipt",
        title: "Private sales handled",
        body: "Buying from another operator rather than a dealer is common in trades and routinely declined elsewhere. We arrange it.",
      },
      {
        icon: "percent",
        title: "Chattel mortgage or lease",
        body: "The structure changes your GST and depreciation position. Your accountant decides; we build to their answer.",
      },
      {
        icon: "check",
        title: "Balloon set sensibly",
        body: "A large balloon lowers the repayment and can leave you owing more than the asset is worth. We'll show you both.",
      },
    ],
    faqs: [
      {
        q: "How quickly can equipment finance be approved?",
        a: "Often within 24 to 48 hours for an established ABN with clean credit under low doc. Larger or full doc facilities take longer.",
      },
      {
        q: "Can I finance used equipment?",
        a: "Yes. Most lenders accept assets up to about ten years old at the end of the term, and private sales as well as dealer purchases.",
      },
      {
        q: "What's the difference between a chattel mortgage and a lease?",
        a: "Under a chattel mortgage you own the asset and claim the GST up front. Under a lease the financier owns it and you claim GST on the payments. The right choice is your accountant's call.",
      },
      {
        q: "Do I need a deposit for equipment finance?",
        a: "Often none for established businesses. Newer ABNs or unusual assets may require a contribution.",
      },
    ],
    formType: "asset",
    related: ["truck-finance", "machinery-excavator", "chattel-mortgage"],
  },

  {
    slug: "truck-finance",
    section: "asset-finance",
    tier: 2,
    title: "Truck Finance | Prime Movers, Rigids & Trailers",
    metaDescription:
      "Truck and trailer finance for owner-drivers and fleets. New and used, private or dealer sale. ACL 515382.",
    primaryKeyword: "truck finance",
    volume: 2900,
    kd: 23,
    eyebrow: "Truck finance",
    h1: "The truck earns from the day it lands.",
    intro:
      "Prime movers, rigids, trailers and tippers. Owner-drivers and fleets, new and used, dealer or private sale.",
    heroImage: "",
    heroAlt: "A truck at a work site",
    qualify: {
      forThem: [
        "Two-year ABN, GST registered",
        "Owner-drivers and fleet operators",
        "New and used, private or dealer",
        "Contract or subcontract work in place",
      ],
      notForThem: [
        "First-time operators with no industry history at most lenders",
        "Current defaults or credit issues",
      ],
    },
    advantages: [
      {
        icon: "clock",
        title: "Funded before it's collected",
        body: "Approval and settlement can run in parallel with the purchase so the truck isn't sitting while paperwork catches up.",
      },
      {
        icon: "search",
        title: "Age and hours understood",
        body: "Lenders cap asset age at end of term. A ten-year-old prime mover on a five-year term needs the right lender, and we know which.",
      },
      {
        icon: "user-group",
        title: "Fleets structured properly",
        body: "Master facilities let you add units without a fresh application every time.",
      },
    ],
    faqs: [
      {
        q: "Can I finance a used truck?",
        a: "Yes. Most lenders assess age at the end of the term rather than at purchase, so a well-maintained used truck on a shorter term is often straightforward.",
      },
      {
        q: "Do I need to be an established operator?",
        a: "Most lenders want two years of ABN. New operators with strong industry experience and a contract in place can sometimes be placed with a specialist lender.",
      },
      {
        q: "Can I finance a trailer separately?",
        a: "Yes, trailers are commonly financed on their own or added to an existing facility.",
      },
    ],
    formType: "asset",
    related: ["equipment-finance", "machinery-excavator", "chattel-mortgage"],
  },

  {
    slug: "machinery-excavator",
    section: "asset-finance",
    tier: 2,
    title: "Machinery & Excavator Finance",
    metaDescription:
      "Excavator, loader and earthmoving machinery finance. New and used, private or dealer sale, low doc available. ACL 515382.",
    primaryKeyword: "machinery finance",
    volume: 1900,
    kd: 25,
    eyebrow: "Machinery",
    h1: "The job starts Monday. The machine isn't financed.",
    intro:
      "Excavators, loaders, skid steers and attachments. Low doc to $100,000, private sales accepted, and approval usually inside a couple of days.",
    heroImage: "/brand/photography/svc-machinery.webp",
    heroAlt: "An excavator working on a construction site",
    qualify: {
      forThem: [
        "Two-year ABN, GST registered",
        "Earthmoving, construction and agricultural machinery",
        "Used assets within ten years",
        "Private or dealer sale",
      ],
      notForThem: [
        "Current defaults or credit issues",
        "Assets outside lender age limits",
      ],
    },
    advantages: [
      {
        icon: "clock",
        title: "Fast enough to matter",
        body: "Machinery purchases usually have a job attached. Low doc approvals commonly come back within 48 hours.",
      },
      {
        icon: "receipt",
        title: "Attachments included",
        body: "Buckets, hammers and augers can usually be financed with the base machine rather than separately.",
      },
      {
        icon: "check",
        title: "Seasonal repayments where they fit",
        body: "Some lenders structure repayments around agricultural and civil work cycles instead of flat monthly amounts.",
      },
    ],
    faqs: [
      {
        q: "Can I finance an excavator from a private seller?",
        a: "Yes. Private sales are routine in this market and accepted by most asset lenders, with a verification process on the seller and the asset.",
      },
      {
        q: "How old can the machine be?",
        a: "Most lenders assess age at the end of the term, commonly capping around ten to fifteen years for machinery. Well-maintained units with service history do better.",
      },
    ],
    formType: "asset",
    related: ["equipment-finance", "truck-finance", "chattel-mortgage"],
  },

  {
    slug: "chattel-mortgage",
    section: "asset-finance",
    tier: 2,
    title: "Chattel Mortgage | Vehicle & Equipment Finance",
    metaDescription:
      "Chattel mortgage finance — you own the asset from day one and claim the GST up front. Compared against lease and hire purchase. ACL 515382.",
    primaryKeyword: "chattel mortgage",
    volume: 3600,
    kd: 23,
    eyebrow: "Chattel mortgage",
    h1: "You own it from day one.",
    intro:
      "Under a chattel mortgage the asset is yours immediately and the lender takes a registered interest. The GST is usually claimable up front, which is why most businesses choose it.",
    heroImage: "",
    heroAlt: "A commercial vehicle at a work site",
    qualify: {
      forThem: [
        "ABN registered, asset used predominantly for business",
        "Vehicles, machinery and equipment",
        "New and used assets",
      ],
      notForThem: [
        "Predominantly private use — a consumer loan applies",
        "Current defaults or credit issues",
      ],
    },
    advantages: [
      {
        icon: "percent",
        title: "GST claimed up front",
        body: "Registered for GST, you can generally claim the input tax credit on the purchase price in your next BAS rather than across the term.",
      },
      {
        icon: "wallet-1",
        title: "Depreciation and interest deductible",
        body: "You hold the asset on your balance sheet and claim depreciation plus the interest component. Confirm the detail with your accountant.",
      },
      {
        icon: "note-01",
        title: "Balloon set deliberately",
        body: "A residual lowers the repayment and raises the total cost. We'll model it against a straight term.",
      },
    ],
    faqs: [
      {
        q: "What is a chattel mortgage?",
        a: "A finance arrangement where you take ownership of the asset immediately and the lender registers a security interest over it until the loan is repaid.",
      },
      {
        q: "Chattel mortgage or lease — which is better?",
        a: "A chattel mortgage suits businesses registered for GST that want ownership and the up-front input tax credit. A lease can suit where off-balance-sheet treatment or lower commitment matters. It's a question for your accountant.",
      },
      {
        q: "Can I claim the GST on a chattel mortgage?",
        a: "Generally yes, the full input tax credit in the BAS period of purchase where the asset is used for business and you're registered for GST. Confirm with your accountant.",
      },
    ],
    formType: "asset",
    related: ["equipment-finance", "truck-finance", "vehicle-finance"],
  },

  {
    slug: "vehicle-finance",
    section: "asset-finance",
    tier: 3,
    title: "Vehicle & Car Finance for Business",
    metaDescription:
      "Business vehicle finance for utes, vans and cars. Chattel mortgage, lease or hire purchase, new and used. ACL 515382.",
    primaryKeyword: "vehicle finance",
    volume: 2400,
    kd: 46,
    eyebrow: "Vehicle finance",
    h1: "The dealer's finance isn't your only option.",
    intro:
      "Dealer finance is convenient and rarely the sharpest number in the room. Comparing takes a day and usually pays for itself several times over.",
    heroImage: "",
    heroAlt: "A work vehicle on site",
    qualify: {
      forThem: [
        "ABN registered, business use",
        "Utes, vans, cars and light commercial",
        "New and used, dealer or private",
      ],
      notForThem: [
        "Predominantly private use — a consumer loan applies",
        "Current defaults or credit issues",
      ],
    },
    advantages: [
      {
        icon: "percent",
        title: "Compared, not accepted",
        body: "Dealer finance is one quote. We'll get you several and tell you where the dealer's offer actually sits.",
      },
      {
        icon: "clock",
        title: "Pre-approval before you negotiate",
        body: "Walking in with finance settled changes the conversation about price.",
      },
      {
        icon: "check",
        title: "Structure to suit the accountant",
        body: "Chattel mortgage, lease or hire purchase — the tax treatment differs and it's their call.",
      },
    ],
    faqs: [
      {
        q: "Is dealer finance more expensive?",
        a: "Often, though not always. The only way to know is to compare, and pre-approval also strengthens your position on price.",
      },
      {
        q: "Can I finance a vehicle in the business name?",
        a: "Yes, where the vehicle is predominantly for business use. This is the usual arrangement for a chattel mortgage.",
      },
    ],
    formType: "asset",
    related: ["chattel-mortgage", "equipment-finance", "truck-finance"],
  },
];
