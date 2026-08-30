import Link from "next/link";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/data/site";

const credentials = [
  "Australian Credit Licence 515382",
  "Aggregator: SFG",
  "Residential · Commercial · Asset · SMSF",
  "Melbourne office",
  "Gold Coast office",
  "Lending nationwide",
];

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
              <p className="type-label text-green">Where we work</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="coverage-heading"
              className="type-display mt-5 max-w-[13ch] text-forest"
            >
              Two offices. Every postcode.
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
                    className="type-label rounded-pill border border-ink-30 px-5 py-3 text-forest transition-colors duration-300 hover:border-green hover:bg-green hover:text-offwhite"
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

          {/* House motif built from the brand graphic elements */}
          <Reveal variant="fade" delay={0.1} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
              <div className="absolute inset-0 rounded-full border border-ink-12" />
              <div className="absolute inset-[12%] rounded-full border border-ink-12" />
              <div className="absolute inset-[24%] rounded-full bg-sand" />
              <svg
                viewBox="0 0 125 130"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[26%] w-auto -translate-x-1/2 -translate-y-1/2 text-green"
              >
                <path
                  d="M125 62.4009V124.8C125 126.179 124.451 127.502 123.474 128.477C122.498 129.452 121.173 130 119.792 130H5.20839C3.82706 130 2.5023 129.452 1.52555 128.477C0.548799 127.502 6.54523e-05 126.179 6.54523e-05 124.8V62.4009C-0.00480896 61.0336 0.262621 59.679 0.786806 58.4159C1.31099 57.1527 2.08147 56.0062 3.05345 55.043L55.1367 3.04364C57.09 1.09476 59.7385 0 62.5 0C65.2615 0 67.91 1.09476 69.8633 3.04364L121.947 55.043C122.919 56.0062 123.689 57.1527 124.213 58.4159C124.737 59.679 125.005 61.0336 125 62.4009Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Credential strip */}
      <div className="border-y border-ink-12 bg-sand-warm py-5">
        <Marquee speed={60} reverse fade>
          {credentials.map((c) => (
            <span key={c} className="flex items-center">
              <span className="type-label px-8 whitespace-nowrap text-forest/70">
                {c}
              </span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green/50" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
