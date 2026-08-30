import type { CalculatorPage } from "@/data/types";
import { dutySchedules, type StateCode } from "@/lib/calculators/rates";

const stateVolumes: Partial<Record<StateCode, { volume: number; kd: number; tier: 1 | 2 }>> = {
  NSW: { volume: 33100, kd: 57, tier: 1 },
  VIC: { volume: 27100, kd: 47, tier: 1 },
  QLD: { volume: 18100, kd: 31, tier: 1 },
  WA: { volume: 12100, kd: 47, tier: 1 },
};

/** One indexable URL per state — a shared tool cannot rank for its own term. */
const stampDutyStates: CalculatorPage[] = (
  Object.keys(dutySchedules) as StateCode[]
).map((code) => {
  const s = dutySchedules[code];
  const meta = stateVolumes[code];
  const lower = code.toLowerCase();
  return {
    slug: `stamp-duty/${lower}`,
    title: `Stamp Duty Calculator ${code} | ${s.name}`,
    metaDescription: `Estimate transfer duty on a ${s.name} property purchase. Current bracket rates, worked examples and what the figure does and doesn't include.`,
    primaryKeyword: `stamp duty calculator ${lower}`,
    volume: meta?.volume,
    kd: meta?.kd,
    tier: meta?.tier ?? 2,
    h1: `${code} stamp duty calculator`,
    intro: `What transfer duty costs on a ${s.name} purchase, before concessions.`,
    kind: "stamp-duty" as const,
    state: code,
    explainer: [
      {
        heading: `How ${s.name} calculates transfer duty`,
        body: `${s.name} charges duty on a sliding scale. Each bracket has a fixed amount plus a marginal rate applied to the value above that bracket's threshold, so duty rises faster than the purchase price does. The figures used here come from ${s.source}.`,
      },
      {
        heading: "What this estimate excludes",
        body: "Concessions and exemptions — including first home buyer, principal place of residence and off-the-plan concessions where the state offers them — are not applied. Neither is the foreign purchaser surcharge. Both can change the payable amount substantially.",
      },
      {
        heading: "When duty is payable",
        body: "Transfer duty is generally payable within a set period of settlement, and lenders will not release funds until arrangements for it are confirmed. It is paid from your own funds, not borrowed under the loan, so it needs to sit in your deposit alongside the purchase price.",
      },
    ],
    faqs: [
      {
        q: `How much is stamp duty in ${s.name}?`,
        a: `It depends on the purchase price and which bracket it falls into. Enter a value above for an estimate at the general rate. Concessions may reduce it and are not included here.`,
      },
      {
        q: "Can stamp duty be added to my loan?",
        a: "Not directly. Duty is paid from your own funds at settlement. It can be indirectly funded by borrowing more against equity elsewhere, but the lender still needs to see the cash available at settlement.",
      },
      {
        q: "Is this figure exact?",
        a: `No. It is an estimate at the general rate using published ${s.source} brackets. Your conveyancer or solicitor will confirm the payable amount for your transaction.`,
      },
    ],
    nextStep: { label: "Work out what you can borrow", href: "/calculators/borrowing-capacity" },
  };
});

export const calculators: CalculatorPage[] = [
  {
    slug: "stamp-duty",
    title: "Stamp Duty Calculator | All Australian States",
    metaDescription:
      "Estimate transfer duty in any Australian state or territory. Current bracket rates, what's included and what isn't.",
    primaryKeyword: "stamp duty calculator",
    volume: 60500,
    kd: 45,
    tier: 1,
    h1: "Stamp duty calculator",
    intro: "Transfer duty in every state and territory, at the general rate.",
    kind: "stamp-duty",
    explainer: [
      {
        heading: "Duty is the largest cost nobody budgets for",
        body: "On a typical capital city purchase, transfer duty is usually the biggest single expense after the deposit. It is paid from your own funds at settlement rather than borrowed, which is why it belongs in the deposit calculation from the beginning rather than being discovered late.",
      },
      {
        heading: "Every state does it differently",
        body: "Each state and territory sets its own brackets, thresholds and concessions, and reviews them at budget time. Two identical purchases in different states can differ by tens of thousands of dollars in duty alone.",
      },
      {
        heading: "Concessions are not included",
        body: "First home buyer, principal place of residence and off-the-plan concessions all exist in various forms and are not applied here. Neither is the foreign purchaser surcharge. Check your state revenue office, or ask us and we'll point you at the right one.",
      },
    ],
    faqs: [
      {
        q: "What is stamp duty?",
        a: "A state government tax on property transfers, calculated on the purchase price or market value, whichever is higher. It's payable at or shortly after settlement.",
      },
      {
        q: "Which state has the highest stamp duty?",
        a: "It varies by price point rather than being fixed. Victoria and South Australia tend to sit at the higher end for mid-range purchases; Queensland's concessional rates for owner-occupiers are among the most generous.",
      },
      {
        q: "Do I pay stamp duty when refinancing?",
        a: "Generally no. Refinancing an existing loan over the same property doesn't usually trigger transfer duty, because ownership isn't changing. Mortgage duty has been abolished in most states.",
      },
    ],
    nextStep: { label: "Work out what you can borrow", href: "/calculators/borrowing-capacity" },
  },
  ...stampDutyStates,
  {
    slug: "home-loan-repayments",
    title: "Home Loan Repayment Calculator",
    metaDescription:
      "Work out monthly, fortnightly or weekly repayments on a home loan. Principal and interest or interest only, over any term.",
    primaryKeyword: "mortgage repayment calculator",
    volume: 110000,
    kd: 62,
    tier: 1,
    h1: "Repayment calculator",
    intro: "What a loan costs each month, and what it costs in total.",
    kind: "repayments",
    explainer: [
      {
        heading: "The total is the number that matters",
        body: "Monthly repayment tells you whether you can afford the loan. Total interest tells you what the loan actually costs. A longer term lowers the first and raises the second, often by more than people expect.",
      },
      {
        heading: "Repayment frequency changes the outcome",
        body: "Paying fortnightly rather than monthly means twenty-six payments a year instead of twelve — effectively an extra month annually. On a thirty-year loan that alone can take years off the term.",
      },
      {
        heading: "What this doesn't include",
        body: "Fees, offset balances, redraw and rate changes over the life of the loan are excluded. Rates move, and a figure calculated at today's rate for thirty years is a comparison tool rather than a forecast.",
      },
    ],
    faqs: [
      {
        q: "How are home loan repayments calculated?",
        a: "Using the standard amortisation formula, which spreads principal and interest evenly across the term. Early repayments are mostly interest; later ones are mostly principal.",
      },
      {
        q: "Should I pay weekly, fortnightly or monthly?",
        a: "Fortnightly usually costs least overall because you make the equivalent of thirteen monthly payments a year. Check the lender applies it as true fortnightly rather than monthly divided by two.",
      },
      {
        q: "What's the difference between principal and interest and interest only?",
        a: "Principal and interest reduces the balance with every payment. Interest only keeps the balance flat and costs less each month, but you pay more over the full term and rates are usually higher.",
      },
    ],
    nextStep: { label: "See what refinancing would save", href: "/calculators/refinance-savings" },
  },
  {
    slug: "borrowing-capacity",
    title: "Borrowing Power Calculator | How Much Can I Borrow?",
    metaDescription:
      "Estimate how much you could borrow based on income, dependants and existing commitments. Indicative only — every lender assesses differently.",
    primaryKeyword: "borrowing power calculator",
    volume: 40500,
    kd: 55,
    tier: 1,
    h1: "Borrowing capacity calculator",
    intro: "A conservative estimate of what a lender might advance.",
    kind: "borrowing",
    explainer: [
      {
        heading: "Every lender will give you a different answer",
        body: "Lenders differ in how they treat overtime, bonuses, rental income, HECS debt and credit card limits. The same borrower can vary by hundreds of thousands of dollars between two lenders on identical figures. That variation is most of what a broker is for.",
      },
      {
        heading: "Assessment rates, not actual rates",
        body: "Lenders assess your ability to repay at a rate roughly three percentage points above the actual rate, so you can absorb increases. That buffer is why the amount you can borrow is well below what today's repayment would suggest.",
      },
      {
        heading: "Expenses are floored, not taken at face value",
        body: "Declaring low living expenses doesn't increase your capacity. Lenders apply a benchmark measure and use the higher of that or your declared figure.",
      },
    ],
    faqs: [
      {
        q: "How much can I borrow on my income?",
        a: "As a rough guide, five to six times gross household income for a straightforward application, though commitments, dependants and the assessment rate move it considerably in both directions.",
      },
      {
        q: "Does a credit card limit affect borrowing capacity?",
        a: "Yes, and more than most people expect. Lenders assess the full limit as though it were drawn, regardless of the balance. Reducing or closing unused cards is often the fastest way to lift capacity.",
      },
      {
        q: "Does HECS reduce how much I can borrow?",
        a: "Yes. Compulsory repayments are treated as a commitment. The effect is larger on smaller incomes.",
      },
    ],
    nextStep: { label: "Estimate your stamp duty", href: "/calculators/stamp-duty" },
  },
  {
    slug: "lmi",
    title: "LMI Calculator | Lenders Mortgage Insurance",
    metaDescription:
      "Estimate lenders mortgage insurance on a loan above 80% LVR, and see where waivers apply for medical and other professionals.",
    primaryKeyword: "lmi calculator",
    volume: 5400,
    kd: 28,
    tier: 1,
    h1: "LMI calculator",
    intro: "What mortgage insurance costs above 80%, and when it doesn't apply.",
    kind: "lmi",
    explainer: [
      {
        heading: "LMI protects the lender, not you",
        body: "It's a one-off premium charged when you borrow more than 80% of the property value. It insures the lender against loss if the loan defaults and the sale doesn't cover the debt. You pay it, and it covers them.",
      },
      {
        heading: "Some professions don't pay it at all",
        body: "Medical professionals commonly borrow up to 95% with no LMI at the major banks. Accountants and lawyers usually reach 90%. On a high-LVR purchase that waiver is frequently the largest single saving available.",
      },
      {
        heading: "The premium is not linear",
        body: "It rises sharply as LVR climbs. Moving from 89% to 90% can cost far more than the extra one per cent borrowed, so a slightly larger deposit sometimes saves several times its own value.",
      },
    ],
    faqs: [
      {
        q: "How much is lenders mortgage insurance?",
        a: "It varies by loan size, LVR and insurer, and is typically a four to five figure one-off premium. It's usually capitalised onto the loan rather than paid in cash.",
      },
      {
        q: "How can I avoid paying LMI?",
        a: "Save a 20% deposit, use a guarantor, or qualify for a professional waiver. Medical professionals can commonly reach 95% without it.",
      },
      {
        q: "Is LMI refundable?",
        a: "Partially, if the loan is repaid within the first year or two, depending on the insurer. After that it generally isn't.",
      },
    ],
    nextStep: { label: "See the professional waivers", href: "/home-loans/doctors-medical-professionals" },
  },
  {
    slug: "refinance-savings",
    title: "Refinance Calculator | What Switching Would Save",
    metaDescription:
      "Compare your current loan against a new rate, including switching costs, and see the break-even point.",
    primaryKeyword: "refinance calculator",
    volume: 2400,
    kd: 42,
    tier: 1,
    h1: "Refinance savings calculator",
    intro: "The monthly saving, the switching cost, and when you break even.",
    kind: "refinance-savings",
    explainer: [
      {
        heading: "The rate difference isn't the saving",
        body: "Discharge fees, application fees and a valuation all come off the top. A sharper rate that costs $4,000 to reach isn't a saving until you've held the new loan long enough to recover that.",
      },
      {
        heading: "Break-even is the real test",
        body: "Divide the total switching cost by the monthly saving and you have the number of months before you're ahead. If you're likely to move or sell before then, switching may not be worth it.",
      },
      {
        heading: "Watch the term",
        body: "Refinancing back to a thirty-year term lowers the repayment and can raise total interest even at a lower rate. Keeping the remaining term is usually the better comparison.",
      },
    ],
    faqs: [
      {
        q: "Is refinancing worth it for 0.5%?",
        a: "On a large balance, often yes — half a per cent on $700,000 is roughly $290 a month. On a small balance with high switching costs, frequently not. The break-even figure answers it directly.",
      },
      {
        q: "What are the costs of refinancing?",
        a: "Typically a discharge fee from the outgoing lender and possibly an application or valuation fee at the new one. Many lenders waive some. There's no fee from us on a standard refinance.",
      },
      {
        q: "How often can I refinance?",
        a: "There's no limit, though refinancing repeatedly in a short period can affect how lenders view your file, and each switch carries costs.",
      },
    ],
    nextStep: { label: "Talk to us about refinancing", href: "/home-loans/refinance" },
  },
  {
    slug: "offset-account",
    title: "Offset Account Calculator",
    metaDescription:
      "See how much interest an offset balance saves and how many years it takes off the loan.",
    primaryKeyword: "offset account calculator",
    volume: 2900,
    kd: 25,
    tier: 2,
    h1: "Offset account calculator",
    intro: "What money sitting in offset is actually earning you.",
    kind: "offset",
    explainer: [
      {
        heading: "An offset balance is tax-free earnings",
        body: "Money in an offset reduces the balance interest is charged on. Saving 6% interest is worth more than earning 6% in a savings account, because the saving isn't taxed and the interest would have been.",
      },
      {
        heading: "It works because it compounds",
        body: "Every dollar of interest not charged means more of your fixed repayment goes to principal, which reduces next month's interest again. The effect on the term is larger than the balance alone suggests.",
      },
      {
        heading: "Check it's a true offset",
        body: "Some accounts described as offset are partial, or only offset a share of the balance. A 100% offset against the full loan is what produces the result shown here.",
      },
    ],
    faqs: [
      {
        q: "Is an offset account worth it?",
        a: "If you routinely hold a meaningful balance, generally yes — even after any package fee. If your balance stays near zero, the fee may exceed the saving.",
      },
      {
        q: "Offset or redraw?",
        a: "Offset keeps the money as your savings, accessible and outside the loan. Redraw puts it into the loan and takes it back out, which can have tax implications on investment properties. Offset is usually cleaner.",
      },
    ],
    nextStep: { label: "Compare your repayments", href: "/calculators/home-loan-repayments" },
  },
  {
    slug: "extra-repayments",
    title: "Extra Repayment Calculator",
    metaDescription:
      "See how much interest an extra repayment saves and how many years it takes off your loan.",
    primaryKeyword: "extra repayment calculator",
    volume: 2900,
    kd: 31,
    tier: 2,
    h1: "Extra repayment calculator",
    intro: "What a little more each month does over thirty years.",
    kind: "extra-repayments",
    explainer: [
      {
        heading: "Small amounts, early, matter most",
        body: "An extra payment in year two saves nearly thirty years of compounding on that amount. The same payment in year twenty-five saves five. If you're going to do it, doing it now is worth several times doing it later.",
      },
      {
        heading: "Check for early repayment limits",
        body: "Variable loans usually allow unlimited extra repayments. Fixed loans often cap them, with break costs beyond the cap. Worth confirming before you start.",
      },
    ],
    faqs: [
      {
        q: "Is it better to pay extra or put money in offset?",
        a: "Financially they're close to identical. Offset keeps the money accessible, which is why most people prefer it. Extra repayments are harder to reverse and that can be an advantage if accessibility is the problem.",
      },
      {
        q: "Can I make extra repayments on a fixed loan?",
        a: "Usually up to an annual cap, commonly around $10,000 to $30,000 a year. Above that, break costs may apply.",
      },
    ],
    nextStep: { label: "Try the offset calculator", href: "/calculators/offset-account" },
  },
];

export function findCalculator(slugPath: string) {
  return calculators.find((c) => c.slug === slugPath);
}

export const stampDutyCalculators = calculators.filter((c) => c.kind === "stamp-duty");
export const otherCalculators = calculators.filter((c) => c.kind !== "stamp-duty");
