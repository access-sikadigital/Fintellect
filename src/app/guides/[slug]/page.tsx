import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/page/FaqSection";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, ComplianceNote } from "@/components/page/ServiceSections";
import { publishedGuides, findGuide } from "@/data/guides";
import { site } from "@/data/site";

export function generateStaticParams() {
  return publishedGuides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = findGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/guides/${g.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = findGuide(slug);
  if (!g) notFound();

  return (
    <>
      <PageHero
        eyebrow={g.cluster}
        h1={g.title}
        intro={g.summary}
        trail={[
          { label: "Guides", href: "/guides" },
          { label: g.title, href: `/guides/${g.slug}` },
        ]}
        cta={{ label: site.cta.primary, href: "/contact" }}
      />

      <article className="section-y bg-offwhite">
        <div className="container-wide grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          {/* Contents — the scannable overview LLMs and readers both want */}
          <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:h-fit">
            <p className="type-label text-clay">On this page</p>
            <ul className="mt-5 grid gap-2.5">
              {g.body!.map((b, i) => (
                <li key={b.heading}>
                  <a
                    href={`#s-${i}`}
                    className="type-body text-[0.9375rem] text-ink-70 transition-colors hover:text-clay"
                  >
                    {b.heading}
                  </a>
                </li>
              ))}
            </ul>
            <p className="type-label mt-8 text-ink-50">
              {g.readMinutes} min read · {g.updated}
            </p>
          </nav>

          <div className="grid gap-10">
            {g.body!.map((b, i) => (
              <Reveal key={b.heading} variant="rise" id={`s-${i}`} className="scroll-mt-32">
                <h2 className="type-title text-[clamp(1.75rem,2.6vw,2.25rem)] text-forest">
                  {b.heading}
                </h2>
                {b.paragraphs.map((t, j) => (
                  <p key={j} className="type-body mt-4 max-w-[68ch] text-ink-70">
                    {t}
                  </p>
                ))}
              </Reveal>
            ))}

            {g.related && (
              <Reveal variant="rise" className="mt-4 border-t border-ink-12 pt-8">
                <p className="type-label text-clay">Related</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {g.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="type-label rounded-pill border border-clay-60 px-5 py-3 text-clay transition-colors hover:bg-clay hover:text-offwhite"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </article>

      <CtaBand
        heading="Rather just ask someone?"
        body="A ten-minute call usually beats an hour of reading."
        cta={{ label: site.cta.primary, href: "/contact" }}
      />

      {g.faqs && <FaqSection faqs={g.faqs} eyebrow="FAQ" heading="Common questions" />}
      <ComplianceNote />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.summary,
            url: `https://${site.domain}/guides/${g.slug}`,
            author: { "@type": "Organization", name: site.name },
            publisher: {
              "@type": "Organization",
              name: site.name,
              identifier: {
                "@type": "PropertyValue",
                name: "Australian Credit Licence",
                value: site.acl,
              },
            },
          }),
        }}
      />
      {g.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: g.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
