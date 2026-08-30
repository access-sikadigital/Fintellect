/* ==========================================================================
 * RATE CONFIGURATION — VERIFY BEFORE LAUNCH
 * ==========================================================================
 *
 * Every number a calculator can publish lives in this file and nowhere else.
 * Nothing is hard-coded into a page template, so an update is one edit here.
 *
 * ⚠  THESE FIGURES ARE SEEDED, NOT VERIFIED.
 *
 * Transfer duty schedules, thresholds and LMI premiums change with every
 * state budget and every lender repricing. The website scope (§8.3) requires
 * each schedule to be checked against the published state revenue office
 * tables and unit tested at bracket boundaries before launch, then reviewed
 * annually after the budget cycle.
 *
 * A calculator that returns a wrong number is worse than no calculator, and
 * under ACL 515382 it carries real risk. Confirm every table below with the
 * source named against it, then set VERIFIED to true and record the date.
 * ========================================================================== */

export const RATES_VERIFIED = false;
export const RATES_REVIEWED_ON = "Not yet verified";

/** One bracket: duty = base + rate × (value − from), applied above `from`. */
export type DutyBracket = {
  /** Lower bound of the bracket, inclusive. */
  from: number;
  /** Fixed amount payable at the bottom of the bracket. */
  base: number;
  /** Marginal rate applied to the excess over `from`, as a decimal. */
  rate: number;
};

export type StateCode = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";

export type DutySchedule = {
  code: StateCode;
  name: string;
  /** The office that publishes the authoritative table. */
  source: string;
  sourceUrl: string;
  brackets: DutyBracket[];
  /** Minimum duty payable, where the state sets one. */
  minimum?: number;
  /** Flat-rate override above a threshold, where a state uses one. */
  flatAbove?: { from: number; rate: number };
  /** Surcharge for foreign purchasers, as a decimal. Flagged, not applied. */
  foreignSurcharge?: number;
  notes: string[];
};

export const dutySchedules: Record<StateCode, DutySchedule> = {
  NSW: {
    code: "NSW",
    name: "New South Wales",
    source: "Revenue NSW",
    sourceUrl: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty",
    minimum: 10,
    brackets: [
      { from: 0, base: 0, rate: 0.0125 },
      { from: 17000, base: 212, rate: 0.015 },
      { from: 37000, base: 512, rate: 0.0175 },
      { from: 99000, base: 1597, rate: 0.035 },
      { from: 372000, base: 11152, rate: 0.045 },
      { from: 1240000, base: 50212, rate: 0.055 },
      { from: 3721000, base: 186691, rate: 0.07 },
    ],
    foreignSurcharge: 0.08,
    notes: [
      "Premium rate applies above the top threshold.",
      "First home buyer exemptions and concessions are not applied here.",
    ],
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    source: "State Revenue Office Victoria",
    sourceUrl: "https://www.sro.vic.gov.au/land-transfer-duty",
    brackets: [
      { from: 0, base: 0, rate: 0.014 },
      { from: 25000, base: 350, rate: 0.024 },
      { from: 130000, base: 2870, rate: 0.06 },
      { from: 960000, base: 0, rate: 0 }, // handled by flatAbove
    ],
    flatAbove: { from: 960000, rate: 0.055 },
    foreignSurcharge: 0.08,
    notes: [
      "Between $960,000 and $2,000,000 duty is a flat 5.5% of the full value.",
      "Principal place of residence concessions are not applied here.",
    ],
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    source: "Queensland Revenue Office",
    sourceUrl: "https://qro.qld.gov.au/duties/transfer-duty/",
    brackets: [
      { from: 0, base: 0, rate: 0 },
      { from: 5000, base: 0, rate: 0.015 },
      { from: 75000, base: 1050, rate: 0.035 },
      { from: 540000, base: 17325, rate: 0.045 },
      { from: 1000000, base: 38025, rate: 0.0575 },
    ],
    foreignSurcharge: 0.08,
    notes: [
      "No duty payable up to $5,000.",
      "Home and first home concessions are not applied here.",
    ],
  },
  WA: {
    code: "WA",
    name: "Western Australia",
    source: "RevenueWA",
    sourceUrl: "https://www.wa.gov.au/organisation/department-of-finance/transfer-duty",
    brackets: [
      { from: 0, base: 0, rate: 0.019 },
      { from: 120000, base: 2280, rate: 0.0285 },
      { from: 150000, base: 3135, rate: 0.038 },
      { from: 360000, base: 11115, rate: 0.0475 },
      { from: 725000, base: 28453, rate: 0.0515 },
    ],
    foreignSurcharge: 0.07,
    notes: ["Residential rate. Concessional rates exist for some purchasers."],
  },
  SA: {
    code: "SA",
    name: "South Australia",
    source: "RevenueSA",
    sourceUrl: "https://www.revenuesa.sa.gov.au/stampduty",
    brackets: [
      { from: 0, base: 0, rate: 0.01 },
      { from: 12000, base: 120, rate: 0.02 },
      { from: 30000, base: 480, rate: 0.03 },
      { from: 50000, base: 1080, rate: 0.035 },
      { from: 100000, base: 2830, rate: 0.04 },
      { from: 200000, base: 6830, rate: 0.0425 },
      { from: 250000, base: 8955, rate: 0.0475 },
      { from: 300000, base: 11330, rate: 0.05 },
      { from: 500000, base: 21330, rate: 0.055 },
    ],
    foreignSurcharge: 0.07,
    notes: ["Concessions apply to some new home and off-the-plan purchases."],
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    source: "State Revenue Office Tasmania",
    sourceUrl: "https://www.sro.tas.gov.au/property-transfer-duties",
    minimum: 50,
    brackets: [
      { from: 0, base: 50, rate: 0 },
      { from: 3000, base: 50, rate: 0.0175 },
      { from: 25000, base: 435, rate: 0.0225 },
      { from: 75000, base: 1560, rate: 0.035 },
      { from: 200000, base: 5935, rate: 0.04 },
      { from: 375000, base: 12935, rate: 0.0425 },
      { from: 725000, base: 27810, rate: 0.045 },
    ],
    foreignSurcharge: 0.08,
    notes: ["Minimum duty of $50 applies."],
  },
  ACT: {
    code: "ACT",
    name: "Australian Capital Territory",
    source: "ACT Revenue Office",
    sourceUrl: "https://www.revenue.act.gov.au/duties-and-taxes/conveyance-duty",
    minimum: 20,
    brackets: [
      { from: 0, base: 0, rate: 0.012 },
      { from: 200000, base: 2400, rate: 0.022 },
      { from: 300000, base: 4600, rate: 0.034 },
      { from: 500000, base: 11400, rate: 0.0432 },
      { from: 750000, base: 22200, rate: 0.059 },
      { from: 1000000, base: 36950, rate: 0.064 },
    ],
    flatAbove: { from: 1455000, rate: 0.0454 },
    notes: [
      "Above the top threshold a flat rate applies to the full value.",
      "The ACT reviews conveyance duty annually.",
    ],
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    source: "NT Territory Revenue Office",
    sourceUrl: "https://nt.gov.au/employ/money-and-taxes/territory-revenue-office/stamp-duty",
    brackets: [
      { from: 525000, base: 25987.5, rate: 0.0495 },
      { from: 3000000, base: 148500, rate: 0.0575 },
      { from: 5000000, base: 287500, rate: 0.0595 },
    ],
    notes: [
      "Below $525,000 the NT applies a formula rather than brackets — see dutyNT().",
      "Rates above are applied to the full value, not the excess.",
    ],
  },
};

/**
 * LMI premium bands, expressed as a percentage of the loan amount.
 *
 * ⚠  Indicative only. Real premiums vary by insurer, lender, loan size,
 * borrower type and whether the loan is owner-occupied. Replace with the
 * lender-supplied table before launch, and note that the scope flags this
 * calculator as compliance-sensitive.
 */
export const lmiBands: { minLvr: number; maxLvr: number; rate: number }[] = [
  { minLvr: 0, maxLvr: 0.8, rate: 0 },
  { minLvr: 0.8, maxLvr: 0.85, rate: 0.0104 },
  { minLvr: 0.85, maxLvr: 0.9, rate: 0.0198 },
  { minLvr: 0.9, maxLvr: 0.95, rate: 0.0331 },
];

/** Assumptions behind the borrowing capacity estimate. */
export const borrowingAssumptions = {
  /** Rate buffer added to the actual rate when assessing, as a decimal. */
  assessmentBuffer: 0.03,
  /** Ceiling on the share of net income that may go to repayments. */
  maxRepaymentShare: 0.45,
  /** Indicative monthly living expense floor, HEM-style. */
  livingExpenseFloor: { single: 2200, couple: 3300, perDependant: 450 },
  /** Share of gross rental income counted as assessable. */
  rentalShading: 0.8,
  defaultTermYears: 30,
};
