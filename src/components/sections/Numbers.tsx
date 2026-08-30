"use client";

import Image from "next/image";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Parallax } from "@/components/motion/Parallax";

/*
 * NOTE FOR LAUNCH — these figures come from Robert's discovery form and are
 * repeated here as supplied. "Items to confirm" in the website scope requires
 * substantiation for every published performance claim before go-live under
 * ACL 515382. Swap or remove any figure that cannot be evidenced.
 */
const stats = [
  {
    value: 22,
    suffix: " min",
    label: "Fastest approval",
    note: "From submission to approved. Not typical, but it happened.",
  },
  {
    value: 217,
    suffix: "",
    label: "Loans settled last year",
    note: "Across home, commercial, asset and SMSF lending.",
  },
  {
    value: 90,
    suffix: "%",
    label: "Of referred clients settle",
    note: "When someone arrives warm, we almost always get it done.",
  },
  {
    value: 0,
    prefix: "$",
    suffix: "",
    label: "Fee on the loans above",
    note: "The lender pays us. Fees apply to private and some commercial lending.",
  },
] as const;

export function Numbers() {
  return (
    <section
      className="section-y relative overflow-hidden bg-sand"
      aria-labelledby="numbers-heading"
    >
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-green">The record</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="numbers-heading"
              className="type-display mt-5 max-w-[14ch] text-forest"
            >
              Speed is the part nobody else is selling.
            </SplitLines>
            <Reveal variant="rise" delay={0.12}>
              <p className="type-body mt-7 max-w-[52ch] text-forest/70">
                The most common complaint about this industry is delay — the
                application that sits for a week, the broker who stops
                answering. We built the whole process around not being that.
              </p>
            </Reveal>
          </div>

          {/* Small photographic anchor */}
          <Reveal variant="clip" delay={0.1} className="hidden lg:block">
            <div className="relative h-[18rem] w-[14rem] overflow-hidden rounded-panel">
              <Parallax speed={0.12} overscan>
                <div className="relative h-[22rem] w-[14rem]">
                  <Image
                    src="/brand/photography/speed-portrait.webp"
                    alt="A broker taking a client call at his desk"
                    fill
                    sizes="14rem"
                    className="object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </Reveal>
        </div>

        {/* Figures */}
        <dl className="mt-16 grid gap-px overflow-hidden rounded-panel border border-ink-12 bg-ink-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col gap-3 bg-sand p-8 transition-colors duration-500 hover:bg-offwhite"
            >
              <dd className="type-title text-[clamp(2.75rem,4.5vw,4rem)] leading-none text-green">
                <Counter
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : ""}
                  suffix={s.suffix}
                />
              </dd>
              <dt className="type-label text-forest">{s.label}</dt>
              <p className="type-body text-[0.875rem] text-forest/60">{s.note}</p>
            </div>
          ))}
        </dl>

        <Reveal variant="fade" delay={0.1}>
          <p className="type-body mt-6 max-w-[80ch] text-[0.8125rem] text-forest/50">
            Figures reflect Fintellect&rsquo;s own records for the twelve months
            to August 2026 and are not a guarantee of any particular outcome.
            Your result depends on your circumstances and the lender&rsquo;s
            assessment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
