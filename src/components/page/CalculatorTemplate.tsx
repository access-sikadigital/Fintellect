import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/page/FaqSection";
import { CalculatorWidget } from "@/components/page/CalculatorWidget";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, ComplianceNote } from "@/components/page/ServiceSections";
import { calculators } from "@/data/calculators";
import { site } from "@/data/site";
import { RATES_VERIFIED } from "@/lib/calculators/rates";
import type { CalculatorPage } from "@/data/types";

/**
 * A calculator page. Per scope §8.2 each one gets its own indexable URL, the
 * headline result ungated, server-rendered supporting content around the tool
 * (a page of pure JavaScript cannot rank for its own term), and both
 * WebApplication and FAQPage schema.
 */
export function CalculatorTemplate({ page }: { page: CalculatorPage }) {
  const siblings = calculators
    .filter((c) => c.slug !== page.slug && !c.slug.startsWith("stamp-duty/"))
    .slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Calculator"
        h1={page.h1}
        intro={page.intro}
        trail={[
          { label: "Calculators", href: "/calculators" },
          { label: page.h1, href: `/calculators/${page.slug}` },
        ]}
        cta={{ label: "Talk to a broker", href: "/contact" }}
      />

      <CalculatorWidget page={page} />

      {/* Server-rendered supporting content — this is what ranks. */}
      <section className="section-y bg-sand" aria-labelledby="explainer-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-[auto_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal variant="fade">
              <p className="type-label text-green">How it works</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="explainer-heading"
              className="type-title mt-4 max-w-[12ch] text-[clamp(1.875rem,2.6vw,2.25rem)] text-forest"
            >
              What this number does and doesn&rsquo;t include.
            </SplitLines>
          </div>

          <Reveal variant="rise" stagger={0.08} className="grid gap-8">
            {page.explainer.map((block) => (
              <article key={block.heading} className="border-t border-ink-12 pt-7">
                <h3 className="type-title text-[clamp(1.375rem,1.7vw,1.4rem)] text-forest">
                  {block.heading}
                </h3>
                <p className="type-body mt-3 max-w-[64ch] text-forest/70">{block.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="A calculator can't approve a loan."
        body="When you want the real number rather than the estimate, that's a ten-minute conversation."
        cta={{ label: "Talk to a broker", href: "/contact" }}
      />

      <FaqSection faqs={page.faqs} eyebrow="FAQ" heading="Common questions" />

      {/* Sibling calculators — internal linking across the cluster */}
      <section className="section-y bg-offwhite" aria-labelledby="other-calcs">
        <div className="container-wide">
          <p className="type-label text-green">More tools</p>
          <h2 id="other-calcs" className="type-title mt-4 text-[clamp(1.75rem,2.6vw,2.375rem)] text-forest">
            Other calculators
          </h2>
          <Reveal variant="rise" stagger={0.06} className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group flex items-center justify-between gap-4 rounded-card border border-ink-12 px-6 py-5 transition-colors duration-500 hover:border-green"
              >
                <span className="type-body font-medium text-forest">{c.h1}</span>
                <span
                  aria-hidden="true"
                  className="text-green transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <ComplianceNote
        extra={
          RATES_VERIFIED
            ? undefined
            : "Rates and thresholds used by this calculator are pending verification against the relevant published schedules."
        }
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: page.h1,
            url: `https://${site.domain}/calculators/${page.slug}`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            description: page.metaDescription,
            offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
            provider: { "@type": "FinancialService", name: site.name },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
