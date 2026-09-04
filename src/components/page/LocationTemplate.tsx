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
import { homeLoanServices, servicePath } from "@/data/services";
import { site } from "@/data/site";
import type { LocationPage } from "@/data/types";

export function LocationTemplate({ page }: { page: LocationPage }) {
  const services = homeLoanServices.filter((s) => s.tier === 1);

  return (
    <>
      <PageHero
        eyebrow={`${page.city} mortgage broker`}
        h1={page.h1}
        intro={page.intro}
        image={page.heroImage}
        trail={[{ label: page.city, href: `/${page.slug}` }]}
      />

      <section className="section-y bg-offwhite" aria-labelledby="local-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-green">
                {page.office ? "Our office" : "Servicing"} · {page.state}
              </p>
            </Reveal>
            <SplitLines
              as="h2"
              id="local-heading"
              className="type-display mt-4 max-w-none sm:max-w-[12ch] text-forest"
            >
              {page.office
                ? `We're based in ${page.city}.`
                : `We lend across ${page.city}.`}
            </SplitLines>
            <Reveal variant="rise" delay={0.1}>
              <p className="type-body mt-6 max-w-[46ch] text-ink-70">
                {page.office
                  ? "You're welcome to come in, and almost nobody does. Identification is verified electronically and documents are signed online, so the whole process runs without a single appointment."
                  : "We hold an Australian Credit Licence and write loans nationally. Everything runs by phone, email and e-signature, which is how most of our clients prefer it anyway."}
              </p>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={0.08}>
            <p className="type-label text-forest/60">Areas we work across</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {page.suburbs.map((s) => (
                <li
                  key={s}
                  className="type-label rounded-pill border border-ink-12 px-4 py-2.5 text-ink-70"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="type-body mt-6 text-[0.875rem] text-ink-50">
              Not listed? It makes no difference — we lend Australia-wide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-wide">
          <p className="type-label text-green">What we arrange</p>
          <SplitLines as="h2" className="type-display mt-4 max-w-none sm:max-w-[13ch] text-forest">
            The situations we see most in {page.city}.
          </SplitLines>
          <Reveal variant="rise" stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={servicePath(s)}
                className="group flex h-full flex-col justify-between gap-6 rounded-panel border border-ink-12 bg-offwhite p-7 transition-colors duration-500 hover:border-green"
              >
                <div>
                  <p className="type-label text-green">{s.eyebrow}</p>
                  <h3 className="type-title mt-3 text-[1.1rem] text-forest">{s.h1}</h3>
                </div>
                <span
                  aria-hidden="true"
                  className="type-label text-green transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <SpeedBand />
      <CtaBand
        heading={`Talk to a ${page.city} broker today.`}
        body="Most enquiries get a call back within about ten minutes during business hours."
      />
      <HowItWorks />
      <Credentials />
      <FaqSection faqs={page.faqs} eyebrow="FAQ" heading={`${page.city} questions`} />
      <EnquiryForm formType="residential" serviceName={`${page.city} enquiry`} />
      <ComplianceNote />

      {/* LocalBusiness schema — only where there is a genuine office. */}
      {page.office && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: `${site.name} — ${page.city}`,
              url: `https://${site.domain}/${page.slug}`,
              telephone: site.phone,
              email: site.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: page.city,
                addressRegion: page.state,
                addressCountry: "AU",
              },
              areaServed: page.suburbs.map((s) => ({ "@type": "Place", name: s })),
              identifier: {
                "@type": "PropertyValue",
                name: "Australian Credit Licence",
                value: site.acl,
              },
            }),
          }}
        />
      )}
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
