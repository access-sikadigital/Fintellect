/**
 * Calculator boundary tests.
 *
 * Website scope §8.3 requires every calculation to be unit tested at bracket
 * boundaries, thresholds and concession cut-offs before launch. Run with:
 *
 *   npm run test:calc
 *
 * These verify the ENGINE is correct and continuous. They do NOT verify the
 * RATES — those must be checked against each state revenue office's published
 * table and signed off separately. See src/lib/calculators/rates.ts.
 */

import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./ts-loader.mjs", pathToFileURL("./scripts/"));

const { dutySchedules } = await import("../src/lib/calculators/rates.ts");
const engine = await import("../src/lib/calculators/engine.ts");

let pass = 0;
let fail = 0;

function check(name, actual, expected, tolerance = 0.01) {
  const ok =
    typeof expected === "number"
      ? Math.abs(actual - expected) <= tolerance
      : actual === expected;
  if (ok) {
    pass += 1;
  } else {
    fail += 1;
    console.log(`  ✗ ${name}\n      expected ${expected}, got ${actual}`);
  }
}

function assert(name, condition) {
  if (condition) pass += 1;
  else {
    fail += 1;
    console.log(`  ✗ ${name}`);
  }
}

console.log("\nStamp duty — continuity at every bracket boundary");
for (const [code, schedule] of Object.entries(dutySchedules)) {
  for (const bracket of schedule.brackets) {
    if (bracket.from === 0) continue;
    const below = engine.stampDuty(bracket.from - 1, code);
    const at = engine.stampDuty(bracket.from, code);
    const above = engine.stampDuty(bracket.from + 1, code);

    // Duty must never meaningfully fall as the property value rises.
    // A sub-dollar step is tolerated: several published tables round the
    // bracket base down (NSW states $212 where the rate gives $212.50).
    assert(
      `${code} monotonic across $${bracket.from.toLocaleString()}`,
      below - at <= 1 && at <= above,
    );
    // And must not jump by an implausible amount at a boundary.
    assert(
      `${code} continuous across $${bracket.from.toLocaleString()}`,
      Math.abs(at - below) < Math.max(2000, bracket.from * 0.02),
    );
  }
}

console.log("Stamp duty — edge cases");
for (const code of Object.keys(dutySchedules)) {
  check(`${code} zero value`, engine.stampDuty(0, code), 0);
  check(`${code} negative value`, engine.stampDuty(-100, code), 0);
  assert(`${code} $750k is positive`, engine.stampDuty(750000, code) > 0);
  assert(
    `${code} duty is under 10% of value`,
    engine.stampDuty(750000, code) < 75000,
  );
}

console.log("Repayments");
check("$500k @ 6% over 30y", engine.repayment(500000, 6, 30), 2997.75, 1);
check("zero interest", engine.repayment(360000, 0, 30), 1000, 0.01);
check("zero principal", engine.repayment(0, 6, 30), 0);
check("interest only $500k @ 6%", engine.interestOnlyRepayment(500000, 6), 2500, 0.01);
assert("total interest positive", engine.totalInterest(500000, 6, 30) > 0);

console.log("LMI");
check("at 80% LVR — none payable", engine.lmiPremium(800000, 1000000), 0);
check("below 80% LVR — none payable", engine.lmiPremium(700000, 1000000), 0);
assert("at 85% LVR — payable", engine.lmiPremium(850000, 1000000) > 0);
assert(
  "premium rises with LVR",
  engine.lmiPremium(900000, 1000000) > engine.lmiPremium(850000, 1000000),
);
check("above 95% LVR — not estimated", engine.lmiPremium(960000, 1000000), 0);

console.log("Offset & extra repayments");
const offset = engine.offsetSaving(600000, 6, 30, 50000);
assert("offset shortens the term", offset.monthsSaved > 0);
assert("offset saves interest", offset.interestSaved > 0);
const noOffset = engine.offsetSaving(600000, 6, 30, 0);
check("zero offset saves nothing", noOffset.monthsSaved, 0);

const extra = engine.extraRepaymentSaving(600000, 6, 30, 500);
assert("extra repayments shorten the term", extra.monthsSaved > 0);
check("no extra saves nothing", engine.extraRepaymentSaving(600000, 6, 30, 0).monthsSaved, 0);

console.log("Refinance comparison");
const refi = engine.refinanceComparison({
  balance: 600000,
  currentRate: 6.5,
  newRate: 5.9,
  yearsRemaining: 25,
  switchingCosts: 1200,
});
assert("a lower rate saves monthly", refi.monthlySaving > 0);
assert("break-even is finite", Number.isFinite(refi.breakEvenMonths));
const worse = engine.refinanceComparison({
  balance: 600000,
  currentRate: 5.5,
  newRate: 6.5,
  yearsRemaining: 25,
  switchingCosts: 1200,
});
assert("a higher rate never breaks even", worse.breakEvenMonths === Infinity);

console.log("Borrowing capacity");
const cap = engine.borrowingCapacity({
  grossIncome: 120000,
  dependants: 0,
  monthlyCommitments: 0,
  rate: 6,
  hasPartner: false,
});
assert("capacity is positive", cap.capacity > 0);
assert("assessment rate includes the buffer", cap.assessmentRate >= 9);
const capDeps = engine.borrowingCapacity({
  grossIncome: 120000,
  dependants: 3,
  monthlyCommitments: 0,
  rate: 6,
  hasPartner: true,
});
assert("dependants reduce capacity", capDeps.capacity < cap.capacity);
const capZero = engine.borrowingCapacity({
  grossIncome: 0,
  dependants: 0,
  monthlyCommitments: 0,
  rate: 6,
  hasPartner: false,
});
check("no income, no capacity", capZero.capacity, 0);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
