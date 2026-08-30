import type { LocationPage } from "@/data/types";

export const locations: LocationPage[] = [
  {
    slug: "mortgage-broker-melbourne",
    city: "Melbourne",
    state: "VIC",
    tier: 1,
    title: "Mortgage Broker Melbourne | Independent, ACL 515382",
    metaDescription:
      "Independent mortgage brokers in Melbourne. Refinancing, self-employed and professional lending. Most enquiries called back within about ten minutes.",
    primaryKeyword: "mortgage broker melbourne",
    volume: 3600,
    kd: 24,
    office: true,
    h1: "A Melbourne broker who answers the phone.",
    intro:
      "We're based here. Most of our Melbourne clients never come into the office — the whole thing runs by phone, email and e-signature.",
    suburbs: [
      "Melbourne CBD",
      "Richmond",
      "South Yarra",
      "Brighton",
      "Hawthorn",
      "Kew",
      "Brunswick",
      "Docklands",
    ],
    faqs: [
      {
        q: "Do I need to come into your Melbourne office?",
        a: "Almost never. Identification can be verified electronically and documents signed online. You're welcome to come in if you'd rather.",
      },
      {
        q: "Do you only work with Melbourne clients?",
        a: "No. We hold an Australian Credit Licence and write loans anywhere in Australia. Melbourne is simply where one of our offices is.",
      },
    ],
  },
  {
    slug: "mortgage-broker-gold-coast",
    city: "Gold Coast",
    state: "QLD",
    tier: 1,
    title: "Mortgage Broker Gold Coast | Independent, ACL 515382",
    metaDescription:
      "Independent mortgage brokers on the Gold Coast. Refinancing, self-employed lending, investment and commercial finance. Called back in about ten minutes.",
    primaryKeyword: "mortgage broker gold coast",
    volume: 2400,
    kd: 26,
    office: true,
    h1: "A Gold Coast broker who picks up.",
    intro:
      "Our second office. Same people, same process, same callback — and we lend right across Queensland from here.",
    suburbs: [
      "Southport",
      "Surfers Paradise",
      "Broadbeach",
      "Burleigh Heads",
      "Robina",
      "Coomera",
      "Palm Beach",
      "Mermaid Beach",
    ],
    faqs: [
      {
        q: "Are you a local Gold Coast broker?",
        a: "Yes, we hold an office here alongside Melbourne, and we're licensed to write loans anywhere in Australia.",
      },
      {
        q: "Can you help with investment property in Queensland?",
        a: "Yes. Investment lending is one of our largest products and Queensland purchases are routine for us.",
      },
    ],
  },
  {
    slug: "mortgage-broker-sydney",
    city: "Sydney",
    state: "NSW",
    tier: 3,
    title: "Mortgage Broker Sydney | Independent, ACL 515382",
    metaDescription:
      "Independent mortgage brokers serving Sydney. Refinancing, self-employed and professional lending. Australia-wide credit licence.",
    primaryKeyword: "mortgage broker sydney",
    volume: 3600,
    kd: 50,
    office: false,
    h1: "A Sydney broker without the Sydney runaround.",
    intro:
      "We don't hold an office here and it makes no difference to the outcome. The process runs by phone, email and e-signature wherever you are.",
    suburbs: [
      "Sydney CBD",
      "North Sydney",
      "Parramatta",
      "Bondi",
      "Chatswood",
      "Manly",
      "Surry Hills",
      "Newtown",
    ],
    faqs: [
      {
        q: "Can you help if you're not based in Sydney?",
        a: "Yes. We hold an Australian Credit Licence and lend nationally. Identification is verified electronically and documents are signed online.",
      },
    ],
  },
  {
    slug: "mortgage-broker-brisbane",
    city: "Brisbane",
    state: "QLD",
    tier: 3,
    title: "Mortgage Broker Brisbane | Independent, ACL 515382",
    metaDescription:
      "Independent mortgage brokers serving Brisbane. Refinancing, self-employed lending, commercial and asset finance. Australia-wide credit licence.",
    primaryKeyword: "mortgage broker brisbane",
    volume: 3600,
    kd: 24,
    office: false,
    h1: "A Brisbane broker on the end of the phone.",
    intro:
      "Our Gold Coast office covers Brisbane and south-east Queensland. Same callback, same process.",
    suburbs: [
      "Brisbane CBD",
      "New Farm",
      "Paddington",
      "Bulimba",
      "Chermside",
      "Indooroopilly",
      "Carindale",
      "Ascot",
    ],
    faqs: [
      {
        q: "Do you have a Brisbane office?",
        a: "Our Queensland office is on the Gold Coast, about an hour away, and we work with Brisbane clients regularly. In practice nearly everything happens remotely.",
      },
    ],
  },
  {
    slug: "mortgage-broker-perth",
    city: "Perth",
    state: "WA",
    tier: 3,
    title: "Mortgage Broker Perth | Independent, ACL 515382",
    metaDescription:
      "Independent mortgage brokers serving Perth and Western Australia. Refinancing, self-employed and asset finance. Australia-wide credit licence.",
    primaryKeyword: "mortgage broker perth",
    volume: 2400,
    kd: 26,
    office: false,
    h1: "A Perth broker who works your hours.",
    intro:
      "The time difference is the only complication, and we schedule around it. Everything else runs exactly as it does on the east coast.",
    suburbs: [
      "Perth CBD",
      "Fremantle",
      "Subiaco",
      "Joondalup",
      "Cottesloe",
      "Scarborough",
      "Rockingham",
      "Midland",
    ],
    faqs: [
      {
        q: "How does the time difference work?",
        a: "We schedule calls in your business hours rather than ours. Enquiries lodged overnight are usually answered first thing in the Perth morning.",
      },
    ],
  },
];

export function findLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
