"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { SplitLines } from "@/components/motion/SplitLines";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/ui/Logo";
import { site } from "@/data/site";

/*
 * FIN-11 — the licence leads, because it is the one claim on this page a
 * visitor can independently verify.
 * SPEC — "22 minutes" deliberately does NOT appear here. It belongs once, in
 * The Record, where the sourcing footnote sits directly beneath it.
 */
const marks = [
  `Our own credit licence — ACL ${site.acl}`,
  `~${site.callbackMinutes} minute callback`,
  "No fee on the loans on this site",
  "We compare five lenders, not forty",
  "One broker, start to settlement",
  "Not owned by a bank",
  "Licensed to lend Australia-wide",
];

/**
 * The hero.
 *
 * Leads with the one claim a visitor can independently verify — Fintellect
 * holds its own Australian Credit Licence rather than operating on a
 * restricted panel — and pairs it with a photograph of real people.
 *
 * Sequence on load: label → headline lines rise from their masks → the rule
 * under the second line draws → copy and actions fade up → the photograph
 * settles in. On scroll the content and the image drift at different rates.
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
          "[data-hero='media']",
          { opacity: 0, y: 34, duration: 1.4, ease: "brand-out" },
          0.15,
        )
        .from("[data-hero='rule']", { drawSVG: "0%", duration: 1.1, ease: "brand-out" }, 0.95)
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
      gsap.to("[data-hero='media']", {
        yPercent: -8,
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
                We reach lenders
              </SplitLines>
              <span className="relative inline-block">
                <SplitLines
                  as="span"
                  className="type-accent block text-sand"
                  immediate
                  delay={0.12}
                >
                  other brokers can&rsquo;t.
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
                    stroke="var(--color-clay)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <div data-hero="copy" className="mt-10 grid gap-7 lg:mt-11">
              <p className="type-subtitle max-w-[44ch] font-normal text-paper-60">
                We hold our own Australian Credit Licence, not a restricted
                lender panel. That&rsquo;s the difference on the applications
                a bank has already said no to.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href={site.cta.href} variant="onDark" size="lg" magnetic>
                  {site.cta.primary}
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

          {/*
            FIN-07 — was a concept clip ("parents forming a roof shape")
            inside a house-shaped mask. John flagged that as AI-looking, so
            both the clip and the mask were removed.

            The image is cut to the frame's own 4:5 ratio. That matters: a
            landscape source in a portrait frame loses most of its width to
            object-cover, which is what made the earlier version soft — a
            1000px file was supplying about 600px to a slot needing 1024 at
            2x. At 960x1200 in a 480px slot it renders at exactly 2x.

            Still a stock photograph, but of real people in a real situation
            rather than a concept shot. Swap the src when client photography
            arrives; nothing else needs to change.
          */}
          <div data-hero="media" className="relative mx-auto w-full max-w-[30rem] lg:mx-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel border border-paper-20">
              <Image
                src="/brand/photography/hero-portrait.webp"
                alt="A couple going through their loan paperwork at home"
                fill
                priority
                quality={88}
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent"
              />
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
