"use client";

import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { SplitLines } from "@/components/motion/SplitLines";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/ui/Logo";
import { HeroMedia } from "@/components/sections/HeroMedia";
import { HOUSE_MASK } from "@/components/sections/houseMask";
import { site } from "@/data/site";

const marks = [
  `Our own credit licence — ACL ${site.acl}`,
  `~${site.callbackMinutes} minute callback`,
  "Fastest approval: 22 minutes",
  "No fee on the loans on this site",
  "We compare five lenders, not forty",
  "One broker, start to settlement",
  "Not owned by a bank",
  `${site.offices.join(" & ")} — lending Australia-wide`,
];

/**
 * The hero.
 *
 * The footage is cut into the house from the brand's graphic elements. The
 * shot is parents forming a roof with their arms, so the gesture sits inside
 * the roof of the mask — the concept and the footage say the same thing, and
 * the result could not belong to another brand.
 *
 * Sequence on load: label → headline lines rise from their masks → the rule
 * draws → copy and actions fade up → the house grows out of its own base
 * while its outline draws around it.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15 })
        .from("[data-hero='label']", { opacity: 0, y: 20, duration: 0.9 })
        .from(
          "[data-hero='house']",
          { opacity: 0, scale: 0.86, transformOrigin: "50% 100%", duration: 1.5, ease: "brand-out" },
          0.15,
        )
        .from("[data-hero='outline']", { drawSVG: "0%", duration: 1.8, ease: "brand-out" }, 0.4)
        .from("[data-hero='rule']", { drawSVG: "0%", duration: 1.1, ease: "brand-out" }, 1.0)
        .from(
          "[data-hero='copy'] > *",
          { opacity: 0, y: 28, duration: 1, stagger: 0.1 },
          0.9,
        )
        .from("[data-hero='strip']", { opacity: 0, y: 20, duration: 0.9 }, 1.25)
        .from("[data-hero='ghost']", { opacity: 0, scale: 0.9, duration: 1.6 }, 0.2);

      // Layers separate on scroll.
      gsap.to("[data-hero='content']", {
        yPercent: 8,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero='house']", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero='ghost']", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="on-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest text-offwhite"
      aria-labelledby="hero-heading"
    >
      {/* Ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <Logomark
          data-hero="ghost"
          className="absolute -left-[12%] top-1/2 h-[78vh] w-auto -translate-y-1/2 text-green/12"
        />
        <div className="absolute top-[8%] right-[6%] h-[38rem] w-[38rem] rounded-full border border-paper-10" />
        <div className="absolute top-[22%] right-[18%] h-[22rem] w-[22rem] rounded-full border border-paper-10" />
      </div>

      <div
        data-hero="content"
        className="container-wide relative z-10 flex flex-1 flex-col justify-center pt-24 pb-14 lg:pt-28 lg:pb-16"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Words */}
          <div>
            <div data-hero="label" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="type-label text-sand">
                Independent mortgage &amp; finance brokers
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-paper-20" />
              <span className="type-label text-paper-40">ACL {site.acl}</span>
            </div>

            <h1 id="hero-heading" className="type-hero mt-7 lg:mt-8">
              <SplitLines as="span" className="block text-offwhite" immediate>
                The right loan,
              </SplitLines>
              <span className="relative inline-block">
                <SplitLines
                  as="span"
                  className="type-accent block text-sand"
                  immediate
                  delay={0.12}
                >
                  without the
                </SplitLines>
                <SplitLines
                  as="span"
                  className="type-accent block text-sand"
                  immediate
                  delay={0.2}
                >
                  runaround.
                </SplitLines>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-[0.12em] w-full overflow-visible"
                >
                  <path
                    data-hero="rule"
                    d="M2 8C120 3 300 2 598 6"
                    stroke="var(--color-green)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <div data-hero="copy" className="mt-10 grid gap-7 lg:mt-11">
              <p className="type-subtitle max-w-[42ch] font-normal text-paper-60">
                We hold our own credit licence, so we reach lenders other
                brokers can&rsquo;t. Most enquiries get a call back in about{" "}
                {site.callbackMinutes} minutes.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="onDark" size="lg" magnetic>
                  Get your free loan health check
                </Button>
                <a
                  href={site.phoneHref}
                  className="type-label px-3 py-4 text-sand transition-colors duration-300 hover:text-offwhite"
                >
                  {site.phone}
                </a>
              </div>

              {/* Scenario entry points — people arrive with a task, not a brand */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => scrollTo("#situations", -40)}
                  className="group flex items-center gap-2.5"
                  aria-label="Scroll to see how we can help"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-paper-20 transition-colors duration-300 group-hover:border-sand">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-sand">
                      <path
                        d="M8 2v11M4 9l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-y-0.5"
                      />
                    </svg>
                  </span>
                  <span className="type-label text-paper-40 transition-colors group-hover:text-sand">
                    Scroll
                  </span>
                </button>
                {[
                  { label: "I want to refinance", href: "/home-loans/refinance" },
                  { label: "What can I borrow?", href: "/calculators/borrowing-capacity" },
                  { label: "The bank said no", href: "/home-loans/self-employed" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="group type-label flex items-center gap-2 text-paper-40 underline decoration-paper-20 underline-offset-[6px] transition-colors hover:text-sand hover:decoration-sand"
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* The house */}
          <div data-hero="house" className="relative mx-auto w-full max-w-[30rem] lg:mx-0">
            <div className="relative aspect-[125/130] w-full">
              {/* Footage, cut to the brand's house silhouette */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: HOUSE_MASK,
                  WebkitMaskImage: HOUSE_MASK,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              >
                <HeroMedia />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-forest/15"
                />
              </div>

              {/* Outline drawn around the same shape */}
              <svg
                aria-hidden="true"
                viewBox="0 0 125 130"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <path
                  data-hero="outline"
                  d="M125 62.4009V124.8C125 126.179 124.451 127.502 123.474 128.477C122.498 129.452 121.173 130 119.792 130H5.20839C3.82706 130 2.5023 129.452 1.52555 128.477C0.548799 127.502 6.54523e-05 126.179 6.54523e-05 124.8V62.4009C-0.00480896 61.0336 0.262621 59.679 0.786806 58.4159C1.31099 57.1527 2.08147 56.0062 3.05345 55.043L55.1367 3.04364C57.09 1.09476 59.7385 0 62.5 0C65.2615 0 67.91 1.09476 69.8633 3.04364L121.947 55.043C122.919 56.0062 123.689 57.1527 124.213 58.4159C124.737 59.679 125.005 61.0336 125 62.4009Z"
                  fill="none"
                  stroke="var(--color-sand)"
                  strokeOpacity="0.45"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials, moving along the base of the hero */}
      <div
        data-hero="strip"
        className="relative z-20 mt-auto border-t border-paper-20 bg-forest py-4"
      >
        <Marquee speed={55} fade>
          {marks.map((m) => (
            <span key={m} className="flex items-center">
              <span className="type-label px-7 whitespace-nowrap text-paper-40">{m}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-sand/50" />
            </span>
          ))}
        </Marquee>
      </div>

    </section>
  );
}
