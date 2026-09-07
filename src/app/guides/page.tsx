import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { CtaBand, ComplianceNote } from "@/components/page/ServiceSections";
import { publishedGuides } from "@/data/guides";
import { GuideGrid } from "@/components/page/GuideGrid";

export const metadata: Metadata = {
  title: "Guides | Straight Answers About Borrowing",
  description:
    "Plain-language guides to refinancing, self-employed lending, LMI waivers, low doc business loans and how brokers get paid.",
  alternates: { canonical: "/guides" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        h1="The things nobody explains until it's too late."
        intro="Written to be useful rather than to rank. If a guide tells you not to do something, that's deliberate."
        image="/brand/photography/page-guides.webp"
        trail={[{ label: "Guides", href: "/guides" }]}
        cta={{ label: "Talk to us", href: "/contact" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide">
          <div className="max-w-[46rem]">
            <Reveal variant="fade">
              <p className="type-label text-clay">Every guide</p>
            </Reveal>
            <SplitLines as="h2" className="type-display mt-4 text-forest">
              Start with the question you actually have.
            </SplitLines>
            <Reveal variant="rise" delay={0.1}>
              <p className="type-body mt-6 text-[1.0625rem] text-ink-70">
                {publishedGuides.length} written so far, across refinancing,
                self-employed lending, LMI, business and asset finance. Filter by
                topic, or read the lot.
              </p>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={0.15} className="mt-12">
            <GuideGrid />
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Rather just ask someone?"
        body="A ten-minute call usually beats an hour of reading."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
      <ComplianceNote />
    </>
  );
}
