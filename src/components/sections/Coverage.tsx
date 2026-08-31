import Image from "next/image";
import Link from "next/link";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";


const cities = [
  { label: "Melbourne", href: "/mortgage-broker-melbourne", live: true },
  { label: "Gold Coast", href: "/mortgage-broker-gold-coast", live: true },
  { label: "Sydney", href: "/mortgage-broker-sydney", live: false },
  { label: "Brisbane", href: "/mortgage-broker-brisbane", live: false },
  { label: "Perth", href: "/mortgage-broker-perth", live: false },
];

export function Coverage() {
  return (
    <section className="relative overflow-hidden bg-offwhite" aria-labelledby="coverage-heading">
      <div className="container-wide section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-clay">Where we work</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="coverage-heading"
              className="type-display mt-5 max-w-[13ch] text-forest"
            >
              We lend anywhere in Australia.
            </SplitLines>
            <Reveal variant="rise" delay={0.12}>
              <p className="type-body mt-7 max-w-[48ch] text-ink-70">
                We&rsquo;re based in {site.offices.join(" and ")} and licensed to
                write loans anywhere in Australia. Most of our clients never come
                into an office — the whole thing runs by phone, email and
                e-signature.
              </p>
            </Reveal>

            <Reveal variant="rise" delay={0.18} stagger={0.06} className="mt-9 flex flex-wrap gap-2.5">
              {cities.map((c) =>
                c.live ? (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="type-label rounded-pill border border-ink-30 px-5 py-3 text-forest transition-colors duration-300 hover:border-clay hover:bg-clay hover:text-offwhite"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    key={c.label}
                    className="type-label rounded-pill border border-dashed border-ink-12 px-5 py-3 text-ink-50"
                  >
                    {c.label}
                  </span>
                ),
              )}
            </Reveal>
          </div>

          {/*
            Was an abstract circle-and-house motif, which read as a placeholder
            in a section that is about real offices. A photograph plus the two
            office cards says considerably more.
          */}
          <Reveal variant="rise" delay={0.1} className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panel">
              <Parallax speed={0.1} overscan>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/brand/photography/coverage.webp"
                    alt="A family outside their home"
                    fill
                    sizes="(min-width:1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent"
              />

              {/* Offices, over the photograph */}
              <div className="absolute inset-x-4 bottom-4 grid gap-2.5 sm:inset-x-5 sm:bottom-5 sm:grid-cols-2">
                {site.offices.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-3 rounded-card border border-paper-20 bg-forest/85 px-4 py-3.5 backdrop-blur-md"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clay text-offwhite">
                      <Icon name="location" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="type-label block text-offwhite">{city}</span>
                      <span className="type-body block text-[0.75rem] text-paper-60">
                        Office
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Licence line, tying the section back to the credential */}
            <div className="mt-3 flex items-center justify-between gap-4 rounded-panel border border-ink-12 px-6 py-4">
              <span className="type-label text-forest/60">Lending</span>
              <span className="type-body text-[0.9375rem] font-medium text-forest">
                Australia-wide · ACL {site.acl}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
