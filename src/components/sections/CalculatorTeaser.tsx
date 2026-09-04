"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const currency = (n: number, decimals = 0) =>
  n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/** Standard amortised principal-and-interest repayment. */
function monthlyRepayment(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const id = `slider-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="type-label text-forest/60"
        >
          {label}
        </label>
        <span className="type-subtitle text-[1.05rem] text-forest numeric">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-pill bg-ink-12 outline-none
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-offwhite [&::-webkit-slider-thumb]:bg-green
          [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200
          hover:[&::-webkit-slider-thumb]:scale-110
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-offwhite [&::-moz-range-thumb]:bg-green"
        style={{
          background: `linear-gradient(to right, var(--color-green) ${pct}%, var(--color-ink-12) ${pct}%)`,
        }}
      />
    </div>
  );
}

export function CalculatorTeaser() {
  const [amount, setAmount] = useState(750_000);
  const [rate, setRate] = useState(6.1);
  const [years, setYears] = useState(30);

  const outRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);

  const { monthly, totalInterest } = useMemo(() => {
    const m = monthlyRepayment(amount, rate, years);
    return { monthly: m, totalInterest: m * years * 12 - amount };
  }, [amount, rate, years]);

  // Tween the headline figure rather than snapping it.
  useIsomorphicLayoutEffect(() => {
    const el = outRef.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      el.textContent = currency(monthly);
      shown.current = monthly;
      return;
    }

    const obj = { n: shown.current };
    const tween = gsap.to(obj, {
      n: monthly,
      duration: 0.6,
      ease: "brand-out",
      onUpdate: () => {
        el.textContent = currency(obj.n);
        shown.current = obj.n;
      },
    });

    return () => {
      tween.kill();
    };
  }, [monthly]);

  return (
    <section
      className="section-y relative overflow-hidden bg-offwhite"
      aria-labelledby="calc-heading"
    >
      <div className="container-wide grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal variant="fade">
            <p className="type-label text-clay">Run the numbers first</p>
          </Reveal>
          <SplitLines
            as="h2"
            id="calc-heading"
            className="type-display mt-5 max-w-[13ch] text-forest"
          >
            Know the number before you talk to anyone.
          </SplitLines>
          <Reveal variant="rise" delay={0.12} className="mt-7 grid gap-6">
            <p className="type-body max-w-[48ch] text-ink-70">
              Sixteen calculators. Stamp duty in every state, repayments,
              borrowing capacity, LMI and what refinancing would really save.
              You get the number without handing over an email address.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/calculators" variant="outline" size="md">
                All calculators
              </Button>
              <Button
                href="/calculators/refinance-savings"
                variant="outline"
                size="md"
              >
                Refinance savings
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The live tool */}
        <Reveal variant="rise" delay={0.08}>
          <div className="relative overflow-hidden rounded-panel border border-ink-12 bg-offwhite p-7 shadow-[0_30px_80px_-40px_var(--color-ink-30)] sm:p-9">
            <div className="flex items-center justify-between gap-4 border-b border-ink-12 pb-5">
              <h3 className="type-label text-forest">Repayment estimate</h3>
              <Link
                href="/calculators/home-loan-repayments"
                className="type-label text-green transition-colors hover:text-forest"
              >
                Full tool →
              </Link>
            </div>

            <div className="grid gap-6 py-7">
              <Slider
                label="Loan amount"
                value={amount}
                min={100_000}
                max={3_000_000}
                step={10_000}
                display={currency(amount)}
                onChange={setAmount}
              />
              <Slider
                label="Interest rate"
                value={rate}
                min={3}
                max={9}
                step={0.05}
                display={`${rate.toFixed(2)}% p.a.`}
                onChange={setRate}
              />
              <Slider
                label="Loan term"
                value={years}
                min={10}
                max={30}
                step={1}
                display={`${years} years`}
                onChange={setYears}
              />
            </div>

            <div className="grid gap-5 rounded-card bg-forest p-7 text-offwhite">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="type-label text-sand">Monthly repayment</p>
                  <p className="type-title mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-none numeric">
                    <span ref={outRef}>{currency(monthly)}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="type-label text-sand">Total interest</p>
                  <p className="type-subtitle mt-2 numeric">
                    {currency(totalInterest)}
                  </p>
                </div>
              </div>
              <p className="type-body text-[0.75rem] leading-relaxed text-paper-40">
                Estimate only. Assumes principal and interest at a constant rate
                for the full term, and excludes fees, charges and rate changes.
                Not an offer of credit or a quote.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
