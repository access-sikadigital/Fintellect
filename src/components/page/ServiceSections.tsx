import { CallButton } from "@/components/ui/CallButton";
import { ActionPair } from "@/components/ui/ActionPair";
import Link from "next/link";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { speed, howItWorks, credentials, complianceNote } from "@/data/shared";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/* ── 2. Qualifying strip ─────────────────────────────────────────────────
 * Where lead quality is won or lost. Stating who this isn't for is the
 * single most effective filter on the page.
 * ───────────────────────────────────────────────────────────────────── */
export function QualifyingStrip({
  forThem,
  notForThem,
}: {
  forThem: string[];
  notForThem: string[];
}) {
  return (
    <section className="section-y bg-paper-warm" aria-labelledby="qualify-heading">
      <div className="container-wide">
        <Reveal variant="fade">
          <p className="type-label text-clay">Is this you?</p>
        </Reveal>
        <SplitLines
          as="h2"
          id="qualify-heading"
          className="type-display mt-4 max-w-[13ch] text-forest"
        >
          We&rsquo;d rather tell you now than waste your afternoon.
        </SplitLines>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          <Reveal
            variant="rise"
            className="rounded-panel border border-ink-12 bg-offwhite p-8 lg:p-10"
          >
            <p className="type-label flex items-center gap-3 text-green">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-green text-offwhite">
                <Icon name="check" className="h-4 w-4" />
              </span>
              This is for you if
            </p>
            <ul className="mt-7 grid gap-3.5">
              {forThem.map((item) => (
                <li key={item} className="type-body flex gap-3 text-forest">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            variant="rise"
            delay={0.08}
            className="rounded-panel border border-ink-12 bg-offwhite p-8 lg:p-10"
          >
            <p className="type-label flex items-center gap-3 text-ink-50">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-30 text-ink-50">
                <span aria-hidden="true" className="h-px w-3 bg-current" />
              </span>
              This isn&rsquo;t for you if
            </p>
            <ul className="mt-7 grid gap-3.5">
              {notForThem.map((item) => (
                <li key={item} className="type-body flex gap-3 text-ink-70">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-30" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="type-body mt-7 text-[0.875rem] text-ink-50">
              Not sure which side you fall on? Call — that&rsquo;s a
              two-minute conversation, not an application.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 3. What you get that a bank won't ──────────────────────────────── */
export function Advantages({
  items,
  heading = "What you get that a bank won't give you",
}: {
  items: { icon: IconName; title: string; body: string }[];
  heading?: string;
}) {
  return (
    <section
      className="on-dark grain relative overflow-hidden bg-forest text-offwhite"
      aria-labelledby="advantages-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[14rem] -left-[10rem] h-[34rem] w-[34rem] rounded-full border border-paper-10" />
      </div>

      <div className="container-wide section-y relative z-10">
        <Reveal variant="fade">
          <p className="type-label text-sand">The difference</p>
        </Reveal>
        <SplitLines
          as="h2"
          id="advantages-heading"
          className="type-display mt-4 max-w-[14ch] text-offwhite"
        >
          {heading}
        </SplitLines>

        <Reveal
          variant="rise"
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:mt-16 lg:gap-6"
        >
          {items.map((item, i) => {
            const light = i % 3 === 1;
            return (
              <article
                key={item.title}
                className={cn(
                  "group flex h-full flex-col rounded-panel border p-8 transition-colors duration-500 lg:p-9",
                  light
                    ? "border-sand bg-sand"
                    : "border-paper-20 bg-paper-10 hover:border-sand/50",
                )}
              >
                <span
                  className={cn(
                    /* The badge takes its colour from the card it sits on:
                       green ring and glyph on the light card, white on the
                       dark one. */
                    "grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                    light
                      ? "border-green text-green"
                      : "border-offwhite text-offwhite",
                  )}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3
                  className={cn(
                    "type-title mt-7 text-[clamp(1.75rem,2.2vw,2.125rem)]",
                    light ? "text-forest" : "text-offwhite",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "type-body mt-3",
                    light ? "text-forest/70" : "text-paper-60",
                  )}
                >
                  {item.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Speed ────────────────────────────────────────────────────────── */
export function SpeedBand({ timeline }: { timeline?: { label: string; value: string }[] }) {
  const rows = timeline ?? speed.timeline;
  return (
    <section className="section-y bg-sand" aria-labelledby="speed-heading">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal variant="fade">
            <p className="type-label text-clay">{speed.eyebrow}</p>
          </Reveal>
          <SplitLines
            as="h2"
            id="speed-heading"
            className="type-display mt-4 max-w-[12ch] text-forest"
          >
            {speed.heading}
          </SplitLines>
          <Reveal variant="rise" delay={0.1}>
            <p className="type-body mt-6 max-w-[44ch] text-forest/70">{speed.body}</p>
          </Reveal>
        </div>

        <Reveal variant="rise" delay={0.08}>
          <dl className="grid gap-px overflow-hidden rounded-panel border border-ink-12 bg-ink-12">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 bg-sand px-7 py-6"
              >
                <dt className="type-label text-forest/60">{row.label}</dt>
                <dd className="type-title text-[clamp(1.75rem,2.4vw,2.25rem)] text-clay numeric">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="type-body mt-4 text-[0.8125rem] text-forest/50">
            Indicative timings based on our own files. Lender assessment times
            vary and are outside our control.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 5. How it works ─────────────────────────────────────────────────── */
export function HowItWorks() {
  return (
    <section className="section-y bg-offwhite" aria-labelledby="how-heading">
      <div className="container-wide">
        <Reveal variant="fade">
          <p className="type-label text-clay">How it works</p>
        </Reveal>
        <SplitLines
          as="h2"
          id="how-heading"
          className="type-display mt-4 max-w-[11ch] text-forest"
        >
          Four steps. No chasing.
        </SplitLines>

        <Reveal
          variant="rise"
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:mt-14 lg:grid-cols-4"
        >
          {howItWorks.map((s) => (
            <article
              key={s.n}
              className="group flex h-full flex-col rounded-panel border border-ink-12 bg-offwhite p-7 transition-colors duration-500 hover:border-clay-60"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-green text-green">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="type-label text-ink-30 numeric">{s.n}</span>
              </div>
              <h3 className="type-title mt-6 text-[clamp(1.375rem,1.7vw,1.625rem)] text-forest">{s.title}</h3>
              <p className="type-body mt-2.5 text-[0.9375rem] text-ink-70">{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 6 + 7. Proof and credentials ───────────────────────────────────── */
export function Credentials({ proofNote }: { proofNote?: string }) {
  return (
    <section className="on-dark bg-forest text-offwhite" aria-labelledby="credentials-heading">
      <div className="container-wide section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-sand">Credentials</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="credentials-heading"
              className="type-title mt-4 max-w-[14ch] text-[clamp(1.875rem,2.6vw,2.25rem)] text-offwhite"
            >
              Licensed in our own right, not on somebody else&rsquo;s panel.
            </SplitLines>
            <Reveal variant="rise" delay={0.1}>
              <p className="type-body mt-6 max-w-[44ch] text-paper-60">
                Holding our own Australian Credit Licence is what lets us reach
                lenders that brokers on restricted aggregator panels cannot.
              </p>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={0.08}>
            <dl className="grid gap-px overflow-hidden rounded-panel border border-paper-20 bg-paper-20 sm:grid-cols-2">
              {credentials.map((c) => (
                <div key={c.label} className="bg-forest px-7 py-7">
                  <dt className="type-label text-paper-40">{c.label}</dt>
                  <dd className="type-title mt-2.5 text-[1.25rem] text-offwhite">{c.value}</dd>
                </div>
              ))}
            </dl>

            {/*
              Proof is the largest content gap in the project — scope §9.
              Five deal stories and the testimonials section were left blank in
              the discovery form. Nothing is invented here.
            */}
            <p className="type-body mt-6 text-[0.875rem] text-paper-40">
              {proofNote ??
                "Case studies with real numbers are being written up from recent settlements and will appear here."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Related pages — internal linking ───────────────────────────────── */
export function RelatedLinks({
  links,
}: {
  links: { label: string; href: string; note?: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="section-y bg-offwhite" aria-labelledby="related-heading">
      <div className="container-wide">
        <Reveal variant="fade">
          <p className="type-label text-clay">Related</p>
        </Reveal>
        <h2 id="related-heading" className="type-title mt-4 text-[clamp(1.75rem,2.6vw,2.375rem)] text-forest">
          You might also need
        </h2>

        <Reveal variant="rise" stagger={0.07} className="mt-9 grid gap-4 sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex flex-col justify-between gap-8 rounded-panel border border-ink-12 p-7 transition-colors duration-500 hover:border-green"
            >
              <span className="type-title text-[1.375rem] text-forest">{l.label}</span>
              <span className="type-label flex items-center gap-2 text-green">
                Read more
                <span
                  aria-hidden="true"
                  className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 11. Compliance footer ──────────────────────────────────────────── */
export function ComplianceNote({ extra }: { extra?: string }) {
  return (
    <section className={cn("border-t border-ink-12 bg-offwhite py-10")}>
      <div className="container-wide">
        <p className="type-body text-[0.8125rem] leading-relaxed text-ink-50">
          {complianceNote}
          {extra ? ` ${extra}` : ""}
        </p>
      </div>
    </section>
  );
}

/* ── Mid-page call to action ────────────────────────────────────────── */
export function CtaBand({
  heading,
  body,
  cta = { label: site.cta.primary, href: "#enquire" },
}: {
  heading: string;
  body?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="bg-sand">
      <div className="container-wide flex flex-col gap-7 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
        <div>
          <SplitLines as="h2" className="type-title max-w-[18ch] text-[clamp(2rem,2.6vw,2.25rem)] text-forest">
            {heading}
          </SplitLines>
          {body && (
            <Reveal variant="rise" delay={0.1}>
              <p className="type-body mt-4 max-w-[46ch] text-forest/70">{body}</p>
            </Reveal>
          )}
        </div>
        <Reveal variant="rise" delay={0.1}>
          <ActionPair>
            <Button
              href={cta.href}
              variant="primary"
              size="lg"
              magnetic
              className="w-full"
            >
              {cta.label}
            </Button>
            <CallButton tone="light" size="lg" />
          </ActionPair>
        </Reveal>
      </div>
    </section>
  );
}
