import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/page/FaqSection";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import {
  SpeedBand,
  HowItWorks,
  Credentials,
  ComplianceNote,
  CtaBand,
} from "@/components/page/ServiceSections";
import { servicesInSection, servicePath } from "@/data/services";
import { site } from "@/data/site";
import type { HubPage, ServicePage } from "@/data/types";

/** A section hub: the children beneath it, plus the shared trust furniture. */
/** Each hub asks the qualifying questions for its own product family. */
const HUB_FORM_TYPE: Record<string, "residential" | "commercial" | "asset"> = {
  "home-loans": "residential",
  "commercial-finance": "commercial",
  "asset-finance": "asset",
};

export function HubTemplate({ hub }: { hub: HubPage }) {
  const children = servicesInSection(
    hub.slug as ServicePage["section"],
  ).sort((a, b) => a.tier - b.tier);

  return (
    <>
      <PageHero
        eyebrow={hub.eyebrow}
        h1={hub.h1}
        intro={hub.intro}
        image={hub.heroImage}
        alt={hub.heroAlt}
        trail={[{ label: hub.eyebrow, href: `/${hub.slug}` }]}
      />

      <section className="section-y bg-offwhite" aria-labelledby="children-heading">
        <div className="container-wide">
          <Reveal variant="fade">
            <p className="type-label text-green">What we arrange</p>
          </Reveal>
          <SplitLines
            as="h2"
            id="children-heading"
            className="type-display mt-4 max-w-[12ch] text-forest"
          >
            Pick the one that sounds like you.
          </SplitLines>

          <Reveal
            variant="rise"
            stagger={0.07}
            className="mt-12 grid gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:mt-16 lg:grid-cols-3 lg:gap-5"
          >
            {children.map((s) => (
              <Link
                key={s.slug}
                href={servicePath(s)}
                className="group flex h-full flex-col justify-between gap-8 rounded-panel border border-ink-12 p-8 transition-colors duration-500 hover:border-green"
              >
                <div>
                  <p className="type-label text-green">{s.eyebrow}</p>
                  <h3 className="type-title mt-4 text-[clamp(1.75rem,2.4vw,2.25rem)] text-forest">
                    {s.h1}
                  </h3>
                  <p className="type-body mt-3 text-[0.9375rem] text-ink-70">{s.intro}</p>
                </div>
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

      <SpeedBand />
      <CtaBand
        heading="Not sure which one you need?"
        body="Call and describe the situation. Working out which product fits is our job, not yours."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
      <HowItWorks />
      <Credentials />
      <FaqSection faqs={hub.faqs} eyebrow="FAQ" heading={`${hub.eyebrow} questions`} />
      {/* The CTAs on this page point at #enquire, so the form has to be here.
          Without it the hash resolved to nothing and the click went nowhere. */}
      <EnquiryForm
        formType={HUB_FORM_TYPE[hub.section] ?? "residential"}
        serviceName={hub.eyebrow}
      />
      <ComplianceNote />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: hub.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: hub.title,
            url: `https://${site.domain}/${hub.slug}`,
            description: hub.metaDescription,
          }),
        }}
      />
    </>
  );
}
