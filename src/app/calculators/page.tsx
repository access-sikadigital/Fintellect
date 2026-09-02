import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, ComplianceNote } from "@/components/page/ServiceSections";
import { stampDutyCalculators, otherCalculators } from "@/data/calculators";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Home Loan Calculators | Stamp Duty, Repayments & LMI",
  description:
    "Free calculators for stamp duty in every state, repayments, borrowing capacity, LMI, offset and refinance savings. No email required to see the result.",
  alternates: { canonical: "/calculators" },
};

function Grid({ items }: { items: { slug: string; h1: string; intro: string }[] }) {
  return (
    <Reveal
      variant="rise"
      stagger={0.05}
      className="mt-9 grid gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-3"
    >
      {items.map((c) => (
        <Link
          key={c.slug}
          href={`/calculators/${c.slug}`}
          className="group flex h-full flex-col justify-between gap-7 rounded-panel border border-ink-12 p-7 transition-colors duration-500 hover:border-green"
        >
          <div>
            <h3 className="type-title text-[1.375rem] text-forest">{c.h1}</h3>
            <p className="type-body mt-2.5 text-[0.9375rem] text-ink-70">{c.intro}</p>
          </div>
          <span className="type-label flex items-center gap-2 text-green">
            Open
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
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        h1="Run the numbers before you talk to anyone."
        intro="Stamp duty in every state, repayments, borrowing capacity, LMI and what refinancing would actually save. Free, and no email required to see the result."
        trail={[{ label: "Calculators", href: "/calculators" }]}
        cta={{ label: "Talk to a broker", href: "/contact" }}
      />

      <section className="section-y bg-offwhite">
        {/* The heading must live inside the container, not carry it. Putting
            container-wide and max-w-[12ch] on one element let mx-auto centre
            the narrow 12ch box, pushing the text into the middle of the page. */}
        <div className="container-wide">
          <SplitLines as="h2" className="type-display max-w-[12ch] text-forest">
            Loan and cost calculators
          </SplitLines>
          <Grid items={otherCalculators} />
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-wide">
          <p className="type-label text-green">By state</p>
          <SplitLines as="h2" className="type-display mt-4 max-w-[12ch] text-forest">
            Stamp duty, state by state.
          </SplitLines>
          <p className="type-body mt-6 max-w-[52ch] text-forest/70">
            Every state sets its own brackets and reviews them at budget time.
            Each has its own calculator and its own explanation.
          </p>
          <Grid items={stampDutyCalculators} />
        </div>
      </section>

      <CtaBand
        heading="Numbers are the easy part."
        body="Which lender will actually approve it is the question the calculator can't answer."
        cta={{ label: "Talk to a broker", href: "/contact" }}
      />
      <ComplianceNote />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Home loan calculators",
            url: `https://${site.domain}/calculators`,
          }),
        }}
      />
    </>
  );
}
