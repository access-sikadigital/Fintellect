import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/page/FaqSection";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import {
  QualifyingStrip,
  Advantages,
  SpeedBand,
  HowItWorks,
  Credentials,
  RelatedLinks,
  ComplianceNote,
  CtaBand,
} from "@/components/page/ServiceSections";
import { commonObjections } from "@/data/shared";
import { allServices, servicePath } from "@/data/services";
import { site } from "@/data/site";
import type { ServicePage } from "@/data/types";
import type { Crumb } from "@/components/page/Breadcrumbs";

const sectionLabels: Record<ServicePage["section"], string> = {
  "home-loans": "Home loans",
  "commercial-finance": "Commercial finance",
  "asset-finance": "Asset finance",
  "smsf-loans": "SMSF lending",
};

/**
 * Renders a complete service page from data, following the eleven-section
 * blueprint in the website scope (§7.1). Every service page in the sitemap
 * uses this, so the structure — and the compliance furniture — is identical
 * everywhere.
 */
export function ServiceTemplate({ page }: { page: ServicePage }) {
  const path = servicePath(page);

  const trail: Crumb[] =
    page.section === "smsf-loans"
      ? [{ label: "SMSF lending", href: "/smsf-loans" }]
      : [
          { label: sectionLabels[page.section], href: `/${page.section}` },
          { label: page.eyebrow, href: path },
        ];

  const related = page.related
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s))
    .map((s) => ({ label: s.eyebrow, href: servicePath(s) }));

  // Page-specific objections first, then the three every page carries.
  const objections = [...(page.objections ?? []), ...commonObjections];

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        intro={page.intro}
        image={page.heroImage}
        trail={trail}
      />

      <QualifyingStrip forThem={page.qualify.forThem} notForThem={page.qualify.notForThem} />

      {/* Form sits high — people arrive ready to enquire, not to read. */}
      <EnquiryForm formType={page.formType} serviceName={page.eyebrow} />

      <Advantages items={page.advantages} />

      <SpeedBand timeline={page.timeline} />

      <CtaBand
        heading="Worth a ten-minute conversation?"
        body="Tell us the situation and we'll tell you whether we can help. If we can't, we'll say so on that first call."
      />

      <HowItWorks />

      <Credentials proofNote={page.proofNote} />

      <FaqSection
        faqs={objections}
        eyebrow="Before you ask"
        heading="The questions people are asking"
        tone="dark"
      />

      <FaqSection faqs={page.faqs} eyebrow="FAQ" heading={`${page.eyebrow} questions`} />

      <RelatedLinks links={related} />

      <ComplianceNote />

      {/* Service + FAQPage schema, per scope §10.2 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.eyebrow,
            serviceType: page.primaryKeyword,
            url: `https://${site.domain}${path}`,
            description: page.metaDescription,
            areaServed: "AU",
            provider: {
              "@type": "FinancialService",
              name: site.name,
              telephone: site.phone,
              identifier: {
                "@type": "PropertyValue",
                name: "Australian Credit Licence",
                value: site.acl,
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...page.faqs, ...objections].map((f) => ({
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
