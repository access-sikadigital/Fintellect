"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  purchaseCosts,
  repayment,
  interestOnlyRepayment,
  totalInterest,
  lmiPremium,
  lvr,
  offsetSaving,
  extraRepaymentSaving,
  refinanceComparison,
  borrowingCapacity,
} from "@/lib/calculators/engine";
import { dutySchedules, type StateCode } from "@/lib/calculators/rates";
import type { CalculatorPage } from "@/data/types";
import { cn } from "@/lib/utils";

const money = (n: number, dp = 0) =>
  n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });

const months = (n: number) => {
  const y = Math.floor(n / 12);
  const m = n % 12;
  if (!y) return `${m} month${m === 1 ? "" : "s"}`;
  if (!m) return `${y} year${y === 1 ? "" : "s"}`;
  return `${y}y ${m}m`;
};

/* ── shared controls ─────────────────────────────────────────────────── */

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = `c-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="type-label text-forest/60">
          {label}
        </label>
        <span className="type-subtitle text-[1.05rem] text-forest numeric">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-pill outline-none
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-offwhite [&::-webkit-slider-thumb]:bg-green
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-offwhite [&::-moz-range-thumb]:bg-green"
        style={{
          background: `linear-gradient(to right, var(--color-green) ${pct}%, var(--color-ink-12) ${pct}%)`,
        }}
      />
    </div>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-3">
      <span className="type-label text-forest/60">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={cn(
              "type-label rounded-pill border px-4 py-2.5 transition-colors duration-300",
              value === o
                ? "border-green bg-green text-offwhite"
                : "border-ink-12 text-ink-70 hover:border-ink-30 hover:text-forest",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({
  headline,
  headlineLabel,
  rows,
}: {
  headline: string;
  headlineLabel: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-6 rounded-card bg-forest p-7 text-offwhite sm:p-8">
      <div>
        <p className="type-label text-sand">{headlineLabel}</p>
        <p className="type-title mt-2.5 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none numeric">
          {headline}
        </p>
      </div>
      {rows.length > 0 && (
        <dl className="grid gap-3 border-t border-paper-20 pt-5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-6">
              <dt className="type-body text-[0.875rem] text-paper-60">{r.label}</dt>
              <dd className="type-subtitle text-[1rem] numeric">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/* ── the widget ──────────────────────────────────────────────────────── */

export function CalculatorWidget({ page }: { page: CalculatorPage }) {
  return (
    <section className="section-y bg-offwhite" aria-labelledby="calc-heading">
      <div className="container-content">
        <h2 id="calc-heading" className="sr-only">
          {page.h1}
        </h2>
        <div className="overflow-hidden rounded-panel border border-ink-12 bg-sand-warm p-7 sm:p-9">
          <Engine page={page} />

          {/*
            Estimate disclaimer, dated, on every result — scope §8.2.
            Licensee wording to replace this before launch.
          */}
          <p className="type-body mt-7 border-t border-ink-12 pt-6 text-[0.8125rem] leading-relaxed text-ink-50">
            Estimate only, and not an offer of credit, a quote or financial
            advice. Figures exclude fees and charges unless stated, assume a
            constant interest rate for the full term, and do not account for
            rate changes. Your actual position depends on the lender&rsquo;s
            assessment of your circumstances.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink-12 pt-6">
            <p className="type-label text-forest/60">Next step</p>
            <Link
              href={page.nextStep.href}
              className="type-label group flex items-center gap-2 text-green transition-colors hover:text-forest"
            >
              {page.nextStep.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Engine({ page }: { page: CalculatorPage }) {
  switch (page.kind) {
    case "stamp-duty":
      return <StampDuty fixedState={page.state} />;
    case "repayments":
      return <Repayments />;
    case "borrowing":
      return <Borrowing />;
    case "lmi":
      return <Lmi />;
    case "offset":
      return <Offset />;
    case "extra-repayments":
      return <Extra />;
    case "refinance-savings":
      return <Refi />;
  }
}

function StampDuty({ fixedState }: { fixedState?: StateCode }) {
  const [value, setValue] = useState(750000);
  const [state, setState] = useState<StateCode>(fixedState ?? "VIC");
  const active = fixedState ?? state;
  const costs = useMemo(() => purchaseCosts(value, active), [value, active]);
  const schedule = dutySchedules[active];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        {!fixedState && (
          <Segmented
            label="State or territory"
            options={Object.keys(dutySchedules) as StateCode[]}
            value={state}
            onChange={setState}
          />
        )}
        <Slider
          label="Property value"
          value={value}
          min={100000}
          max={3000000}
          step={10000}
          display={money(value)}
          onChange={setValue}
        />
        <p className="type-body text-[0.8125rem] text-forest/60">
          General rate for {schedule.name}. Concessions, exemptions and the
          foreign purchaser surcharge are not applied. Source: {schedule.source}.
        </p>
      </div>

      <Result
        headlineLabel="Estimated transfer duty"
        headline={money(costs.duty)}
        rows={[
          { label: "Transfer fee (indicative)", value: money(costs.transferFee) },
          { label: "Registration (indicative)", value: money(costs.registrationFee) },
          { label: "Total government costs", value: money(costs.total) },
        ]}
      />
    </div>
  );
}

function Repayments() {
  const [amount, setAmount] = useState(650000);
  const [rate, setRate] = useState(6.1);
  const [years, setYears] = useState(30);
  const [type, setType] = useState<"Principal & interest" | "Interest only">(
    "Principal & interest",
  );

  const io = type === "Interest only";
  const monthly = io ? interestOnlyRepayment(amount, rate) : repayment(amount, rate, years);
  const fortnightly = io
    ? interestOnlyRepayment(amount, rate, 26)
    : repayment(amount, rate, years, 26);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Loan amount" value={amount} min={100000} max={3000000} step={10000}
          display={money(amount)} onChange={setAmount} />
        <Slider label="Interest rate" value={rate} min={3} max={10} step={0.05}
          display={`${rate.toFixed(2)}% p.a.`} onChange={setRate} />
        <Slider label="Loan term" value={years} min={5} max={30} step={1}
          display={`${years} years`} onChange={setYears} />
        <Segmented label="Repayment type"
          options={["Principal & interest", "Interest only"] as const}
          value={type} onChange={setType} />
      </div>

      <Result
        headlineLabel="Monthly repayment"
        headline={money(monthly)}
        rows={[
          { label: "Fortnightly", value: money(fortnightly) },
          {
            label: io ? "Interest per year" : "Total interest over term",
            value: io ? money(monthly * 12) : money(totalInterest(amount, rate, years)),
          },
          { label: "Total repaid", value: io ? "—" : money(monthly * years * 12) },
        ]}
      />
    </div>
  );
}

function Borrowing() {
  const [income, setIncome] = useState(120000);
  const [partner, setPartner] = useState(0);
  const [dependants, setDependants] = useState(0);
  const [commitments, setCommitments] = useState(0);
  const [rate, setRate] = useState(6.1);

  const result = useMemo(
    () =>
      borrowingCapacity({
        grossIncome: income,
        partnerIncome: partner,
        dependants,
        monthlyCommitments: commitments,
        rate,
        hasPartner: partner > 0,
      }),
    [income, partner, dependants, commitments, rate],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Your gross income" value={income} min={40000} max={500000} step={5000}
          display={`${money(income)} p.a.`} onChange={setIncome} />
        <Slider label="Partner's gross income" value={partner} min={0} max={500000} step={5000}
          display={partner ? `${money(partner)} p.a.` : "None"} onChange={setPartner} />
        <Slider label="Dependants" value={dependants} min={0} max={6} step={1}
          display={String(dependants)} onChange={setDependants} />
        <Slider label="Monthly commitments" value={commitments} min={0} max={6000} step={100}
          display={money(commitments)} onChange={setCommitments} />
        <Slider label="Interest rate" value={rate} min={3} max={10} step={0.05}
          display={`${rate.toFixed(2)}% p.a.`} onChange={setRate} />
      </div>

      <Result
        headlineLabel="Indicative borrowing capacity"
        headline={money(result.capacity)}
        rows={[
          { label: "Assessed at", value: `${result.assessmentRate.toFixed(2)}% p.a.` },
          { label: "Monthly surplus used", value: money(result.monthlySurplus) },
          { label: "Over a term of", value: "30 years" },
        ]}
      />
    </div>
  );
}

function Lmi() {
  const [value, setValue] = useState(900000);
  const [deposit, setDeposit] = useState(90000);
  const loan = Math.max(0, value - deposit);
  const ratio = lvr(loan, value);
  const premium = lmiPremium(loan, value);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Property value" value={value} min={200000} max={3000000} step={10000}
          display={money(value)} onChange={setValue} />
        <Slider label="Deposit" value={deposit} min={0} max={value} step={5000}
          display={`${money(deposit)} (${((deposit / value) * 100).toFixed(0)}%)`}
          onChange={setDeposit} />
        <div className="rounded-card border border-ink-12 p-5">
          <p className="type-label text-forest/60">Loan to value ratio</p>
          <p className="type-title mt-2 text-[1.75rem] text-green numeric">
            {(ratio * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <Result
          headlineLabel={ratio > 0.95 ? "Above 95% — not estimated" : "Estimated LMI premium"}
          headline={ratio > 0.95 ? "—" : money(premium)}
          rows={[
            { label: "Loan amount", value: money(loan) },
            { label: "LVR", value: `${(ratio * 100).toFixed(1)}%` },
          ]}
        />
        {ratio > 0.8 && ratio <= 0.95 && (
          <Link
            href="/home-loans/doctors-medical-professionals"
            className="group flex items-center gap-4 rounded-card border border-green bg-green/10 p-5 transition-colors hover:bg-green/15"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green text-offwhite">
              <Icon name="percent" className="h-4 w-4" />
            </span>
            <span className="type-body text-[0.9375rem] text-forest">
              Medical professionals often pay none of this. See the waivers →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function Offset() {
  const [amount, setAmount] = useState(650000);
  const [rate, setRate] = useState(6.1);
  const [years, setYears] = useState(30);
  const [balance, setBalance] = useState(40000);
  const r = useMemo(() => offsetSaving(amount, rate, years, balance), [amount, rate, years, balance]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Loan amount" value={amount} min={100000} max={3000000} step={10000}
          display={money(amount)} onChange={setAmount} />
        <Slider label="Offset balance" value={balance} min={0} max={300000} step={5000}
          display={money(balance)} onChange={setBalance} />
        <Slider label="Interest rate" value={rate} min={3} max={10} step={0.05}
          display={`${rate.toFixed(2)}% p.a.`} onChange={setRate} />
        <Slider label="Loan term" value={years} min={5} max={30} step={1}
          display={`${years} years`} onChange={setYears} />
      </div>
      <Result
        headlineLabel="Interest saved"
        headline={money(r.interestSaved)}
        rows={[
          { label: "Time off the loan", value: months(r.monthsSaved) },
          { label: "New term", value: months(r.newTermMonths) },
        ]}
      />
    </div>
  );
}

function Extra() {
  const [amount, setAmount] = useState(650000);
  const [rate, setRate] = useState(6.1);
  const [years, setYears] = useState(30);
  const [extra, setExtra] = useState(300);
  const r = useMemo(
    () => extraRepaymentSaving(amount, rate, years, extra),
    [amount, rate, years, extra],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Loan amount" value={amount} min={100000} max={3000000} step={10000}
          display={money(amount)} onChange={setAmount} />
        <Slider label="Extra per month" value={extra} min={0} max={3000} step={50}
          display={money(extra)} onChange={setExtra} />
        <Slider label="Interest rate" value={rate} min={3} max={10} step={0.05}
          display={`${rate.toFixed(2)}% p.a.`} onChange={setRate} />
        <Slider label="Loan term" value={years} min={5} max={30} step={1}
          display={`${years} years`} onChange={setYears} />
      </div>
      <Result
        headlineLabel="Interest saved"
        headline={money(r.interestSaved)}
        rows={[
          { label: "Time off the loan", value: months(r.monthsSaved) },
          { label: "New term", value: months(r.newTermMonths) },
          { label: "Base repayment", value: money(repayment(amount, rate, years)) },
        ]}
      />
    </div>
  );
}

function Refi() {
  const [balance, setBalance] = useState(650000);
  const [current, setCurrent] = useState(6.6);
  const [proposed, setProposed] = useState(5.95);
  const [years, setYears] = useState(25);
  const [costs, setCosts] = useState(1200);

  const r = useMemo(
    () =>
      refinanceComparison({
        balance,
        currentRate: current,
        newRate: proposed,
        yearsRemaining: years,
        switchingCosts: costs,
      }),
    [balance, current, proposed, years, costs],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="grid gap-6">
        <Slider label="Loan balance" value={balance} min={100000} max={3000000} step={10000}
          display={money(balance)} onChange={setBalance} />
        <Slider label="Current rate" value={current} min={3} max={10} step={0.05}
          display={`${current.toFixed(2)}%`} onChange={setCurrent} />
        <Slider label="New rate" value={proposed} min={3} max={10} step={0.05}
          display={`${proposed.toFixed(2)}%`} onChange={setProposed} />
        <Slider label="Years remaining" value={years} min={5} max={30} step={1}
          display={`${years} years`} onChange={setYears} />
        <Slider label="Switching costs" value={costs} min={0} max={5000} step={100}
          display={money(costs)} onChange={setCosts} />
      </div>
      <Result
        headlineLabel={r.monthlySaving > 0 ? "Monthly saving" : "No monthly saving"}
        headline={money(Math.max(0, r.monthlySaving))}
        rows={[
          { label: "Per year", value: money(Math.max(0, r.annualSaving)) },
          {
            label: "Break even after",
            value: Number.isFinite(r.breakEvenMonths) ? months(r.breakEvenMonths) : "Never",
          },
          { label: "Current repayment", value: money(r.currentRepayment) },
          { label: "New repayment", value: money(r.newRepayment) },
        ]}
      />
    </div>
  );
}
