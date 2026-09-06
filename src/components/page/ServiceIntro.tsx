import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import type { ServicePage } from "@/data/types";

/**
 * Sits immediately under the hero on every service page.
 *
 * Client direction, 6 Sep: "there's no information at all on these services
 * ... it just goes straight into the form. It doesn't tell you anything about
 * the actual service." And: the persuasive line belongs here rather than in
 * the H1 — "then you can go into the pain point angles."
 *
 * So the order is: what the product is, the three steps to get it, and then
 * the angle. Explanation first for the visitor who arrived from a search and
 * is still deciding whether this page is even relevant to them.
 */
export function ServiceIntro({ page }: { page: ServicePage }) {
  if (!page.explainer && !page.angle) return null;

  return (
    <section
      data-surface="offwhite"
      className="section-y bg-offwhite"
      aria-labelledby="service-intro-heading"
    >
      <div className="container-wide">
        {page.explainer && (
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Reveal variant="fade">
                <p className="type-label text-clay">In plain terms</p>
              </Reveal>
              <SplitLines
                as="h2"
                id="service-intro-heading"
                className="type-display mt-4 max-w-none text-forest sm:max-w-[14ch]"
              >
                {page.explainer.heading}
              </SplitLines>
            </div>

            <div>
              <Reveal variant="rise">
                <p className="type-subtitle font-normal text-forest/75">{page.explainer.body}</p>
              </Reveal>

              <Reveal variant="rise" delay={0.1} stagger={0.08} className="mt-10 grid gap-4">
                {page.explainer.steps.map((s) => (
                  <div
                    key={s.n}
                    /* White, not cream: the client asked for these to stop
                       disappearing into the background. */
                    className="flex gap-5 rounded-panel border border-ink-12 bg-form p-6"
                  >
                    <span className="type-label shrink-0 text-clay">{s.n}</span>
                    <div>
                      <h3 className="type-title text-[clamp(1.25rem,1.7vw,1.5rem)] text-forest">{s.title}</h3>
                      <p className="type-body mt-2 text-forest/70">{s.body}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        )}

        {page.angle && (
          <div className="mt-16 border-t border-ink-12 pt-14 lg:mt-24 lg:pt-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <SplitLines
                as="h2"
                className="type-title max-w-none text-[clamp(1.875rem,2.8vw,2.5rem)] text-forest sm:max-w-[16ch]"
              >
                {page.angle.heading}
              </SplitLines>
              <Reveal variant="rise">
                <p className="type-subtitle font-normal text-forest/75">{page.angle.body}</p>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
