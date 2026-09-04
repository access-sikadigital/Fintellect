import Image from "next/image";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Icon } from "@/components/ui/Icon";
import { lenders, reviews, rating, team } from "@/data/proof";
import { site } from "@/data/site";

/* ══════════ FIN-08 · lender / aggregator logo strip ══════════
 * The change brief calls this "the single biggest real vs AI signal".
 * Renders nothing until real logos are supplied — an empty logo band would
 * be worse than no band.
 */
export function LenderStrip() {
  if (lenders.length === 0) return null;

  return (
    <section className="border-y border-ink-12 bg-sand-deep py-10" aria-labelledby="lenders-heading">
      <div className="container-wide">
        <h2 id="lenders-heading" className="type-label text-center text-forest/60">
          Some of the lenders we can place you with
        </h2>
      </div>
      <div className="mt-8">
        <Marquee speed={45} fade>
          {lenders.map((l) => (
            <span key={l.name} className="flex items-center px-10">
              <Image
                src={l.logo}
                alt={l.name}
                width={128}
                height={40}
                className="h-8 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="container-wide mt-8">
        <p className="type-body text-center text-[0.8125rem] text-forest/50">
          Holding our own credit licence means we are not limited to one
          aggregator&rsquo;s panel. Lender availability depends on your
          circumstances.
        </p>
      </div>
    </section>
  );
}

/* ══════════ FIN-09 · reviews with names ══════════ */
export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="section-y bg-offwhite" aria-labelledby="reviews-heading">
      <div className="container-wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-clay">What clients say</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="reviews-heading"
              className="type-display mt-4 max-w-none sm:max-w-[13ch] text-forest"
            >
              Nine in ten of our clients arrived by referral.
            </SplitLines>
          </div>
          {rating && (
            <Reveal variant="rise" delay={0.1}>
              <div className="flex items-center gap-4 rounded-panel border border-ink-12 px-7 py-5">
                <span className="type-title text-[2.5rem] leading-none text-clay numeric">
                  {rating.score.toFixed(1)}
                </span>
                <span>
                  <span className="flex gap-0.5 text-clay">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-4 w-4" />
                    ))}
                  </span>
                  <span className="type-body mt-1 block text-[0.8125rem] text-ink-50">
                    {rating.count} Google reviews
                  </span>
                </span>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal
          variant="rise"
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:mt-16 lg:grid-cols-3"
        >
          {reviews.map((r) => (
            <figure
              key={r.name + r.quote.slice(0, 16)}
              className="flex h-full flex-col justify-between gap-7 rounded-panel border border-ink-12 bg-paper-warm p-8"
            >
              <blockquote className="type-body text-ink-70">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="type-label block text-forest">{r.name}</span>
                {r.detail && (
                  <span className="type-body mt-1 block text-[0.8125rem] text-ink-50">
                    {r.detail}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════ FIN-10 · meet the broker ══════════
 * The copy leans on "one person, start to finish". This is where that person
 * appears. Renders nothing until real photography and names exist — a stock
 * portrait here would undo the point of the section.
 */
export function Team() {
  if (team.length === 0) return null;

  return (
    <section className="section-y bg-sand" aria-labelledby="team-heading">
      <div className="container-wide">
        <Reveal variant="fade">
          <p className="type-label text-clay">The people</p>
        </Reveal>
        <SplitLines
          as="h2"
          id="team-heading"
          className="type-display mt-4 max-w-none sm:max-w-[13ch] text-forest"
        >
          The broker you speak to is the one who settles it.
        </SplitLines>

        <Reveal
          variant="rise"
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {team.map((m) => (
            <article key={m.name} className="flex flex-col gap-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel bg-sand-deep">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width:1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="type-title text-[1.5rem] text-forest">{m.name}</h3>
                <p className="type-label mt-1.5 text-clay">{m.role}</p>
                <p className="type-body mt-3 text-[0.9375rem] text-ink-70">{m.bio}</p>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          <p className="type-body mt-10 text-[0.8125rem] text-forest/50">
            {site.legalName} holds Australian Credit Licence {site.acl}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
