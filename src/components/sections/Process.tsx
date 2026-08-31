"use client";

import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/data/site";

type Step = {
  n: string;
  icon: IconName;
  lead: string;
  body: string;
  meta: string;
  detail: [string, string, string];
};

const steps: Step[] = [
  {
    n: "01",
    icon: "chat",
    lead: "Tell us the situation",
    body: "One short form, or one phone call. We ask what the money is actually for before anything else — that single answer decides the lender, the structure and everything that follows.",
    meta: "About 3 minutes",
    detail: ["No credit check yet", "Nothing lodged", "Ask us anything"],
  },
  {
    n: "02",
    icon: "clock",
    lead: "We come back fast",
    body: `In business hours most enquiries get a call within about ${site.callbackMinutes} minutes. By the end of it you'll know whether we can help, and roughly what it looks like if we can.`,
    meta: `~${site.callbackMinutes} minute callback`,
    detail: ["We try three times", "A person, not a queue", "Straight answer"],
  },
  {
    n: "03",
    icon: "search",
    lead: "We shortlist and pre-position",
    body: "We compare the lenders who will actually say yes to your situation, then structure the application so it lands the right way the first time instead of being fixed after a decline.",
    meta: "Structured, not scattergun",
    detail: ["Our own credit licence", "Compared, then explained", "Positioned first"],
  },
  {
    n: "04",
    icon: "check",
    lead: "We handle it to settlement",
    body: "Valuation, conditions, documents and the follow-up nobody enjoys. One point of contact the whole way, and you hear from us before you have to ask.",
    meta: "One person, start to finish",
    detail: ["We chase the lender", "Updates without asking", "Same broker"],
  },
];

/**
 * How it works — a four-card grid.
 *
 * `auto-rows-fr` holds every card to the same height regardless of copy
 * length, and each card lays its content out top-down with the meta line
 * pinned to the base, so the four read as a set rather than four odd shapes.
 * Nothing here touches the scroll position.
 */
export function Process() {
  return (
    <section
      className="on-dark grain relative overflow-hidden bg-forest text-offwhite"
      aria-labelledby="process-heading"
    >
      {/* Brand circle motif behind the grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[18rem] -right-[12rem] h-[46rem] w-[46rem] rounded-full border border-paper-10" />
        <div className="absolute -bottom-[22rem] -left-[14rem] h-[38rem] w-[38rem] rounded-full border border-paper-10" />
      </div>

      <div className="container-wide section-y relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-sand">How it works</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="process-heading"
              className="type-display mt-4 max-w-[12ch] text-offwhite"
            >
              From your first call to settlement.
            </SplitLines>
          </div>
          <Reveal variant="rise" delay={0.1} className="lg:pb-2">
            <p className="type-body max-w-[38ch] text-paper-60">
              The whole process, exactly as it runs. Only the first step
              needs you.
            </p>
          </Reveal>
        </div>

        {/* Cards — equal height via auto-rows-fr */}
        <Reveal
          variant="rise"
          stagger={0.09}
          delay={0.05}
          className="mt-12 grid gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:mt-16 lg:gap-6"
        >
          {steps.map((step) => (
            <article
              key={step.n}
              className="group relative flex h-full flex-col overflow-hidden rounded-panel border border-paper-20 bg-paper-10 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-sand/50 lg:p-9"
            >
              {/* Oversized numeral, clipped by the card edge */}
              <span
                aria-hidden="true"
                className="type-title pointer-events-none absolute -right-4 -bottom-10 text-[11rem] leading-none text-paper-10 numeric transition-colors duration-500 group-hover:text-paper-20"
              >
                {step.n}
              </span>

              {/* Head */}
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-paper-20 text-sand transition-colors duration-500 group-hover:border-sand/60">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="type-label text-paper-40 numeric">
                  Step {step.n}
                </span>
              </div>

              {/* Copy */}
              <h3 className="type-title relative mt-6 text-[clamp(1.4rem,2vw,1.85rem)] text-offwhite">
                {step.lead}
              </h3>
              <p className="type-body relative mt-3 max-w-[46ch] text-[0.9375rem] text-paper-60">
                {step.body}
              </p>

              {/* Detail chips */}
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {step.detail.map((d) => (
                  <li
                    key={d}
                    className="type-label rounded-pill border border-paper-20 px-3.5 py-1.5 text-[0.6875rem] text-paper-60 transition-colors duration-500 group-hover:border-paper-40"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              {/* Meta, pinned to the base so every card ends on the same line */}
              <div className="relative mt-auto flex items-center gap-3 border-t border-paper-20 pt-6 lg:pt-7">
                <span aria-hidden="true" className="h-px w-6 bg-sand/60" />
                <span className="type-label text-sand">{step.meta}</span>
              </div>
            </article>
          ))}
        </Reveal>

        {/* Closing statement */}
        <Reveal variant="rise" delay={0.1}>
          <div className="mt-5 flex flex-col gap-7 rounded-panel bg-sand-deep p-8 text-forest lg:mt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-11">
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-clay-20 text-clay">
                <Icon name="thumb-up" className="h-5 w-5" />
              </span>
              <div>
                <p className="type-label text-clay">The honest part</p>
                <p className="type-title mt-3 max-w-[26ch] text-[clamp(1.4rem,2.2vw,2rem)]">
                  If we can&rsquo;t beat what you already have, we&rsquo;ll tell
                  you to stay put.
                </p>
                <p className="type-body mt-3 max-w-[42ch] text-[0.9375rem] text-forest/70">
                  That answer costs us a deal and keeps us worth referring.
                </p>
              </div>
            </div>
            <Button href={site.cta.href} variant="primary" size="sm" className="shrink-0">
              {site.cta.primary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
