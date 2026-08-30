import {
  dutySchedules,
  lmiBands,
  borrowingAssumptions,
  type StateCode,
} from "./rates";

/* ==========================================================================
 * CALCULATION ENGINE
 * Pure functions only — no React, no DOM. Everything here is unit tested at
 * bracket boundaries by scripts/test-calculators.mjs.
 * ========================================================================== */

/** Northern Territory applies a formula below $525,000 rather than brackets. */
export function dutyNT(value: number): number {
  if (value <= 0) return 0;
  if (value < 525000) {
    const v = value / 1000;
    return 0.06571441 * v * v + 15 * v;
  }
  const s = dutySchedules.NT;
  const band = [...s.brackets].reverse().find((b) => value >= b.from);
  // NT applies its rate to the full value above $525,000.
  return band ? value * band.rate : 0;
}

/**
 * Transfer (stamp) duty for a property value in a given state.
 * Returns 0 for non-positive values rather than throwing.
 */
export function stampDuty(value: number, state: StateCode): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  if (state === "NT") return round2(dutyNT(value));

  const schedule = dutySchedules[state];

  // Some states switch to a flat rate on the full value above a threshold.
  if (schedule.flatAbove && value >= schedule.flatAbove.from) {
    const flat = value * schedule.flatAbove.rate;
    // Victoria's flat band stops at $2m, above which brackets resume.
    if (state === "VIC" && value >= 2000000) {
      return round2(110000 + (value - 2000000) * 0.065);
    }
    return round2(Math.max(flat, schedule.minimum ?? 0));
  }

  const bracket = [...schedule.brackets]
    .filter((b) => b.rate > 0 || b.base > 0)
    .reverse()
    .find((b) => value >= b.from) ?? schedule.brackets[0];

  const duty = bracket.base + (value - bracket.from) * bracket.rate;
  return round2(Math.max(duty, schedule.minimum ?? 0));
}

/** Duty plus the usual transfer and registration fees, as an indication. */
export function purchaseCosts(value: number, state: StateCode) {
  const duty = stampDuty(value, state);
  // Indicative only — actual fees are set by each state's land registry.
  const transferFee = 200;
  const registrationFee = 200;
  return {
    duty,
    transferFee,
    registrationFee,
    total: round2(duty + transferFee + registrationFee),
  };
}

/** Standard amortised principal-and-interest repayment, per period. */
export function repayment(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRatePct / 100 / periodsPerYear;
  const n = years * periodsPerYear;
  if (r === 0) return round2(principal / n);
  return round2((principal * r) / (1 - Math.pow(1 + r, -n)));
}

/** Interest-only repayment, per period. */
export function interestOnlyRepayment(
  principal: number,
  annualRatePct: number,
  periodsPerYear = 12,
): number {
  if (principal <= 0) return 0;
  return round2((principal * (annualRatePct / 100)) / periodsPerYear);
}

export function totalInterest(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
): number {
  const pay = repayment(principal, annualRatePct, years, periodsPerYear);
  return round2(pay * years * periodsPerYear - principal);
}

/** LMI premium estimate. Returns 0 at or below 80% LVR. */
export function lmiPremium(loan: number, propertyValue: number): number {
  if (loan <= 0 || propertyValue <= 0) return 0;
  const lvr = loan / propertyValue;
  if (lvr <= 0.8) return 0;
  const band = lmiBands.find((b) => lvr > b.minLvr && lvr <= b.maxLvr);
  if (!band) return 0; // above 95% LVR: not estimated
  return round2(loan * band.rate);
}

export function lvr(loan: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return loan / propertyValue;
}

/** Months saved and interest saved by adding an extra regular repayment. */
export function extraRepaymentSaving(
  principal: number,
  annualRatePct: number,
  years: number,
  extraPerMonth: number,
) {
  const base = repayment(principal, annualRatePct, years);
  const r = annualRatePct / 100 / 12;
  const pay = base + Math.max(0, extraPerMonth);

  let balance = principal;
  let months = 0;
  const cap = years * 12 + 1;

  while (balance > 0 && months < cap) {
    balance = balance * (1 + r) - pay;
    months += 1;
  }

  const baseInterest = totalInterest(principal, annualRatePct, years);
  const newInterest = round2(pay * months - principal);

  return {
    monthsSaved: Math.max(0, years * 12 - months),
    interestSaved: round2(Math.max(0, baseInterest - newInterest)),
    newTermMonths: months,
  };
}

/** Interest saved and term reduced by holding a balance in an offset account. */
export function offsetSaving(
  principal: number,
  annualRatePct: number,
  years: number,
  offsetBalance: number,
) {
  const r = annualRatePct / 100 / 12;
  const pay = repayment(principal, annualRatePct, years);
  const offset = Math.max(0, Math.min(offsetBalance, principal));

  let balance = principal;
  let months = 0;
  const cap = years * 12 + 1;

  while (balance > 0 && months < cap) {
    const charged = Math.max(0, balance - offset);
    balance = balance + charged * r - pay;
    months += 1;
  }

  const baseInterest = totalInterest(principal, annualRatePct, years);
  const newInterest = round2(pay * months - principal);

  return {
    monthsSaved: Math.max(0, years * 12 - months),
    interestSaved: round2(Math.max(0, baseInterest - newInterest)),
    newTermMonths: months,
  };
}

/** Comparison between a current loan and a proposed one. */
export function refinanceComparison(input: {
  balance: number;
  currentRate: number;
  newRate: number;
  yearsRemaining: number;
  switchingCosts: number;
}) {
  const { balance, currentRate, newRate, yearsRemaining, switchingCosts } = input;
  const current = repayment(balance, currentRate, yearsRemaining);
  const proposed = repayment(balance, newRate, yearsRemaining);
  const monthlySaving = round2(current - proposed);
  const breakEvenMonths =
    monthlySaving > 0 ? Math.ceil(switchingCosts / monthlySaving) : Infinity;

  return {
    currentRepayment: current,
    newRepayment: proposed,
    monthlySaving,
    annualSaving: round2(monthlySaving * 12),
    breakEvenMonths,
    interestSavedOverTerm: round2(
      totalInterest(balance, currentRate, yearsRemaining) -
        totalInterest(balance, newRate, yearsRemaining) -
        switchingCosts,
    ),
  };
}

/**
 * Indicative borrowing capacity.
 *
 * Deliberately conservative and clearly an estimate — every lender assesses
 * differently, which is the point the page makes alongside the number.
 */
export function borrowingCapacity(input: {
  grossIncome: number;
  partnerIncome?: number;
  dependants: number;
  monthlyCommitments: number;
  rentalIncome?: number;
  rate: number;
  years?: number;
  hasPartner: boolean;
}) {
  const {
    grossIncome,
    partnerIncome = 0,
    dependants,
    monthlyCommitments,
    rentalIncome = 0,
    rate,
    years = borrowingAssumptions.defaultTermYears,
    hasPartner,
  } = input;

  const a = borrowingAssumptions;
  const gross =
    grossIncome + partnerIncome + rentalIncome * a.rentalShading;

  // Rough after-tax conversion. Indicative only — not a tax calculation.
  const net = gross * 0.72;
  const monthlyNet = net / 12;

  const expenses =
    (hasPartner ? a.livingExpenseFloor.couple : a.livingExpenseFloor.single) +
    dependants * a.livingExpenseFloor.perDependant;

  // Surplus after living costs and existing commitments is the real driver.
  const surplus = Math.max(
    0,
    Math.min(
      monthlyNet - expenses - monthlyCommitments,
      // Secondary ceiling — no lender lends to the last dollar of surplus.
      monthlyNet * a.maxRepaymentShare,
    ),
  );

  // Capitalise the surplus at the buffered assessment rate.
  const assessed = rate + a.assessmentBuffer * 100;
  const r = assessed / 100 / 12;
  const n = years * 12;
  const capacity = r === 0 ? surplus * n : (surplus * (1 - Math.pow(1 + r, -n))) / r;

  return {
    monthlySurplus: round2(surplus),
    assessmentRate: round2(assessed),
    capacity: Math.max(0, Math.floor(capacity / 1000) * 1000),
  };
}

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
