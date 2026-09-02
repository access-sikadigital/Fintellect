import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ComplianceNote } from "@/components/page/ServiceSections";

export type LegalBlock = { heading: string; body: string[] };

/**
 * Compliance pages. Long-form prose set at a comfortable measure, with a
 * sticky contents rail on desktop.
 *
 * ⚠ DRAFT. Scope §11 lists the licensee's written guidelines and required
 * wording as outstanding. These pages must be reviewed and approved before
 * launch — they are a condition of holding ACL 515382, not marketing copy.
 */
export function LegalTemplate({
  eyebrow,
  h1,
  intro,
  slug,
  blocks,
  updated,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  slug: string;
  blocks: LegalBlock[];
  updated: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        h1={h1}
        intro={intro}
        trail={[{ label: eyebrow, href: `/${slug}` }]}
        cta={{ label: "Contact us", href: "/contact" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:h-fit">
            <p className="type-label text-forest/60">On this page</p>
            <ul className="mt-5 grid gap-2.5">
              {blocks.map((b, i) => (
                <li key={b.heading}>
                  <a
                    href={`#s-${i}`}
                    className="type-body text-[0.9375rem] text-ink-70 transition-colors hover:text-green"
                  >
                    {b.heading}
                  </a>
                </li>
              ))}
            </ul>
            <p className="type-label mt-8 text-ink-50">Last updated {updated}</p>
          </nav>

          <div className="grid gap-10">
            {blocks.map((b, i) => (
              <Reveal key={b.heading} variant="rise" id={`s-${i}`} className="scroll-mt-32">
                <h2 className="type-title text-[clamp(1.75rem,2.6vw,2.375rem)] text-forest">
                  {b.heading}
                </h2>
                {b.body.map((p, j) => (
                  <p key={j} className="type-body mt-4 max-w-[70ch] text-ink-70">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ComplianceNote />
    </>
  );
}
