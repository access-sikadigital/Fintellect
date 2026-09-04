import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

/*
 * The Record.
 *
 * Figures are Robert's own, confirmed by John at sign-off (31 Aug 2026) and
 * sourced in the line beneath the grid. "22 minutes" appears here and
 * nowhere else on the site, so the claim sits with its sourcing.
 *
 * FIN-05 — Counter server-renders the real figure as its resting state, so a
 * slow load, a JS failure or reduced motion can never show a row of zeros.
 * FIN-07 — the stock "broker taking a call" portrait that sat beside this
 * has been removed. The numbers carry the section.
 */
const stats = [
  { value: 22, suffix: " min", label: "Fastest approval", note: "From submission to approved." },
  { value: 217, suffix: "", label: "Loans settled last year", note: "Home, commercial, asset and SMSF." },
  { value: 90, suffix: "%", label: "Of referred clients settle", note: "When someone arrives warm." },
  { value: 0, prefix: "$", suffix: "", label: "Fee on the loans above", note: "The lender pays us on settlement." },
];

export function Numbers() {
  return (
    <section className="section-y relative overflow-hidden bg-sand" aria-labelledby="numbers-heading">
      <div className="container-wide">
        <div className="grid gap-7 lg:max-w-[54rem]">
          <Reveal variant="fade">
            <p className="type-label text-clay">The record</p>
          </Reveal>
          <SplitLines
            as="h2"
            id="numbers-heading"
            className="type-display max-w-[14ch] text-forest"
          >
            What the last twelve months looked like.
          </SplitLines>
          <Reveal variant="rise" delay={0.12}>
            <p className="type-body max-w-[52ch] text-forest/70">
              The most common complaint about this industry is delay — the
              application that sits for a week, the broker who stops answering.
              We built the process around not being that.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-panel border border-ink-12 bg-ink-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              /*
                One ground for all four. The gap-px over bg-ink-12 already
                draws the hairline between cells, so the tiles no longer need
                alternating fills to stop reading as a single slab.
              */
              className="group flex flex-col gap-3 bg-offwhite p-8 transition-colors duration-500 hover:bg-paper-warm"
            >
              <dd className="type-title text-[clamp(2.75rem,4.5vw,4rem)] leading-none text-clay">
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
          <p className="type-body mt-6 text-[0.8125rem] text-forest/50">
            From our own records for the twelve months to August 2026. Your
            result depends on your circumstances and the lender&rsquo;s
            assessment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
