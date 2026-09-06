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
    h1: "Equipment finance for Australian businesses",
    intro:
      "Equipment finance is the fastest lending we do. Two years of ABN, GST registration and the invoice is usually the whole conversation.",
    heroImage: "/brand/photography/svc-equipment.webp",
    heroAlt: "Heavy equipment working on a site",
    angle: {
      heading: "The gear has to be on site next week.",
      body: "The job is booked, the machine is sitting at a dealer three states away, and paying cash for it would empty the account you run wages from. Equipment finance is what stops a growth job turning into a cash flow problem. The asset secures the loan, so the lender is looking at the equipment and your trading history rather than asking you to put the house up.",
    },
    explainer: {
      heading: "What equipment finance is",
      body: "A loan secured against the equipment you are buying, repaid over two to seven years. Because the asset is the security, approval leans on your ABN history and the invoice rather than on full financials. Most established businesses with a two-year ABN and GST registration are assessed low doc, which is why it is the fastest lending we arrange.",
      steps: [
        {
          n: "01",
          title: "Send us the invoice",
          body: "The supplier quote or invoice, your ABN, and roughly what the business turns over. That is the whole application for most low doc deals.",
        },
        {
          n: "02",
          title: "We take it to the lenders that fund your asset",
          body: "Not every lender funds used gear, private sales or your industry. We go to the ones that do, so a decline does not sit on your credit file.",
        },
        {
          n: "03",
          title: "Settle and get it on site",
          body: "Approvals commonly come back in 24 to 48 hours. We pay the supplier directly and the machine goes to work.",
        },
      ],
    },
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
    h1: "Truck finance for owner-drivers and transport operators",
    intro:
      "Prime movers, rigids, trailers and tippers. Owner-drivers and fleets, new and used, dealer or private sale.",
    heroImage: "/brand/photography/svc-truck.webp",
    heroAlt: "A finance agreement being signed",
    angle: {
      heading: "The truck earns from the day it lands.",
      body: "Every week a prime mover sits unfinanced is a week it is not billing. Transport is one of the industries banks quietly rate as higher risk, which is why owner-drivers get slow answers from the branch and fast ones from lenders who actually understand freight.",
    },
    explainer: {
      heading: "What truck finance is",
      body: "A chattel mortgage or lease secured against the truck or trailer, over two to seven years. Lenders will fund new and used, dealer or private sale, and most will consider units up to around ten to fifteen years old at the end of the term. First-time owner-drivers can be funded, though usually with a deposit or a property-owning position.",
      steps: [
        {
          n: "01",
          title: "Tell us the truck and the work",
          body: "Make, model, age, and what it will be carrying. Freight type changes which lenders will look at it.",
        },
        {
          n: "02",
          title: "We match it to transport lenders",
          body: "Some will not touch tippers or tautliners; others specialise in them. We go where the asset and the industry both fit.",
        },
        {
          n: "03",
          title: "Settle and start earning",
          body: "We handle the dealer or private vendor, the transfer and the payout, so the truck is on the road rather than in a yard.",
        },
      ],
    },
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
    h1: "Machinery finance for excavators and earthmoving gear",
    intro:
      "Excavators, loaders, skid steers and attachments. Low doc to $100,000, private sales accepted, and approval usually inside a couple of days.",
    heroImage: "/brand/photography/svc-machinery.webp",
    heroAlt: "An excavator working on a construction site",
    angle: {
      heading: "The job starts Monday. The machine isn't financed.",
      body: "Earthmoving work is won at short notice and lost the same way. When the contract depends on having a machine on site, an approval that takes three weeks is the same as a decline. Getting the finance conversation started before you win the tender is usually the difference.",
    },
    explainer: {
      heading: "What machinery finance is",
      body: "A loan secured against the excavator, loader, skid steer or attachment, typically over three to five years. Yellow goods hold value well, so lenders lend against them readily — but they care about hours, age and whether the sale is private or through a dealer, and those three answers decide who will fund it.",
      steps: [
        {
          n: "01",
          title: "Send the machine details",
          body: "Make, model, year, hours and the invoice or auction listing. Private and auction purchases are both fine.",
        },
        {
          n: "02",
          title: "We place it with the right lender",
          body: "Machine age and hours rule some lenders out entirely. We only submit where it fits, which keeps your credit file clean.",
        },
        {
          n: "03",
          title: "On site for the start date",
          body: "Funds go to the vendor or auction house directly, so the machine is released and you make the Monday start.",
        },
      ],
    },
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
    h1: "Chattel mortgage for business vehicles and equipment",
    intro:
      "Under a chattel mortgage the asset is yours immediately and the lender takes a registered interest. The GST is usually claimable up front, which is why most businesses choose it.",
    heroImage: "/brand/photography/svc-chattel.webp",
    heroAlt: "A finance agreement being completed",
    angle: {
      heading: "You own it from day one.",
      body: "The structure you choose changes your tax position more than the interest rate does. A chattel mortgage puts the asset on your balance sheet immediately, which is what makes the GST and depreciation treatment work the way most accountants prefer.",
    },
    explainer: {
      heading: "What a chattel mortgage is",
      body: "You take ownership of the asset at purchase and the lender registers a security interest over it until the loan is paid out. For a GST-registered business on a cash basis, the GST on the purchase price is generally claimable in the next BAS, and you can usually claim depreciation and the interest portion. A lease works differently. Your accountant should make the call and we will build to their answer.",
      steps: [
        {
          n: "01",
          title: "Talk to your accountant first",
          body: "Chattel mortgage, lease or rental changes what you can claim and when. It is a tax question before it is a finance question.",
        },
        {
          n: "02",
          title: "We structure the facility to match",
          body: "Term, balloon and ownership set up the way your accountant asked for, across the lenders that offer it.",
        },
        {
          n: "03",
          title: "Settle and claim",
          body: "You own the asset from settlement. We give you the documents your bookkeeper needs for the BAS.",
        },
      ],
    },
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
    h1: "Vehicle finance for business and personal buyers",
    intro:
      "Dealer finance is convenient and rarely the sharpest number in the room. Comparing takes a day and usually pays for itself several times over.",
    heroImage: "/brand/photography/svc-vehicle.webp",
    heroAlt: "A vehicle finance agreement at a desk",
    angle: {
      heading: "The dealer's finance isn't your only option.",
      body: "Dealer finance is convenient at exactly the moment you are least able to compare it — sitting in the office, keys almost in hand. The rate is often carrying a margin the dealership sets, and you are unlikely to be told what it is. An approval in your pocket before you walk in changes the conversation.",
    },
    explainer: {
      heading: "What vehicle finance is",
      body: "A loan secured against the car or ute, over one to seven years. Business buyers usually take a chattel mortgage for the tax treatment; personal buyers take a secured consumer loan, where the rate depends on credit history, the age of the vehicle and whether it is a dealer or private sale.",
      steps: [
        {
          n: "01",
          title: "Tell us the vehicle and who is buying it",
          body: "Business or personal changes both the product and the paperwork. So does dealer versus private sale.",
        },
        {
          n: "02",
          title: "We get you approved before you negotiate",
          body: "Walking in pre-approved means you are negotiating the price of the car, not the price of the finance.",
        },
        {
          n: "03",
          title: "Settle wherever you are buying",
          body: "Dealer, private seller or auction — we handle the payout and the transfer either way.",
        },
      ],
    },
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
