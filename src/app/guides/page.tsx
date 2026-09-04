import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { CtaBand, ComplianceNote } from "@/components/page/ServiceSections";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides | Straight Answers About Borrowing",
  description:
    "Plain-language guides to refinancing, self-employed lending, LMI waivers, low doc business loans and how brokers get paid.",
  alternates: { canonical: "/guides" },
};

export default function Page() {
  const clusters = [...new Set(guides.map((g) => g.cluster))];

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

      {clusters.map((cluster, ci) => (
        <section
          key={cluster}
          className={ci % 2 === 0 ? "section-y bg-offwhite" : "section-y bg-sand"}
        >
          <div className="container-wide">
            <p className="type-label text-clay">{cluster}</p>
            <SplitLines as="h2" className="type-display mt-4 max-w-none sm:max-w-[13ch] text-forest">
              {cluster} guides
            </SplitLines>
            <Reveal
              variant="rise"
              stagger={0.06}
              className="mt-10 grid gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-3"
            >
              {guides
                .filter((g) => g.cluster === cluster)
                .map((g) => (
                  <Link
                    key={g.slug}
                    href={g.body ? `/guides/${g.slug}` : "/contact"}
                    className="group flex h-full flex-col justify-between gap-7 rounded-panel border border-ink-12 bg-offwhite p-7 transition-colors duration-500 hover:border-green"
                  >
                    <div>
                      <h3 className="type-title text-[1.375rem] text-forest">{g.title}</h3>
                      <p className="type-body mt-2.5 text-[0.9375rem] text-ink-70">{g.summary}</p>
                    </div>
                    <span className="type-label flex items-center gap-2 text-clay">
                      {g.body ? `Read · ${g.readMinutes} min` : "Coming soon"}
                      {g.body && (
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand
        heading="Rather just ask someone?"
        body="A ten-minute call usually beats an hour of reading."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
      <ComplianceNote />
    </>
  );
}
