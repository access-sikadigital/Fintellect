"use client";

import { ActionPair } from "@/components/ui/ActionPair";
import { HeroBackdrop } from "@/components/page/HeroBackdrop";
import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/ui/Logo";
import { site } from "@/data/site";

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
        {/*
          FIN-07 — was a concept clip inside a house-shaped mask; John flagged
          that as AI-looking, so both were removed. It then ran as a framed
          panel on the right, which read as a card sitting on the band rather
          than part of it. The photograph now occupies the right 70% of the band
          itself, under one wash that runs the full width of the section, so
          its left edge falls inside solid forest and never reads as an edge.

          `parallax` tags the photograph itself for the GSAP drift, so the wash
          over it stays pinned to the section and cannot slide out of register.
        */}
        <HeroBackdrop src="/brand/photography/home-hero.webp" parallax />
        <Logomark
          data-hero="ghost"
          className="absolute -left-[12%] top-1/2 h-[78vh] w-auto -translate-y-1/2 text-green/12"
        />
        <div className="absolute top-[8%] right-[6%] h-[38rem] w-[38rem] rounded-full border border-paper-10" />
        <div className="absolute top-[22%] right-[18%] h-[22rem] w-[22rem] rounded-full border border-paper-10" />
      </div>

      <div
        data-hero="content"
        className="container-wide relative z-10 flex flex-1 flex-col justify-center pt-20 pb-10 sm:pt-24 lg:pt-28 lg:pb-16"
      >
        {/* Words. The photograph is the ground now, so these take a single
            column and stop short of the right, where it reads through. */}
        <div className="max-w-[42rem] lg:max-w-[46rem]">
          <div>
            {/* No ACL number here — client asked twice for it to come out of
                the hero. It remains in the credential band, the footer and
                the compliance note, which is where it belongs legally. */}
            <div data-hero="label" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="type-label text-sand">
                Award-winning independent brokers
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-paper-20" />
              <span className="type-label text-paper-40">
                Not owned by a bank
              </span>
            </div>

            <h1 id="hero-heading" className="type-hero mt-6 lg:mt-8">
              <SplitLines as="span" className="block text-offwhite" immediate>
                Australian mortgage
              </SplitLines>
              <span className="relative inline-block">
                <SplitLines
                  as="span"
                  className="type-accent block text-sand"
                  immediate
                  delay={0.12}
                >
                  and finance brokers.
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
                Home loans, commercial finance and asset finance. Fast
                approvals, one broker from your first call through to
                settlement, and no fee to you on the loans on this site.
              </p>
              <ActionPair>
                <Button
                  href={site.cta.href}
                  variant="onDark"
                  size="lg"
                  magnetic
                  className="w-full"
                >
                  {site.cta.primary}
                </Button>
              </ActionPair>

              {/* Scenario entry points — people arrive with a task, not a
                  brand. Clay rather than paper: the client asked for the
                  orange to break up the green. */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                {[
                  { label: "I want to refinance", href: "/home-loans/refinance" },
                  { label: "What can I borrow?", href: "/calculators/borrowing-capacity" },
                  { label: "The bank said no", href: "/home-loans/self-employed" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="group type-label flex items-center gap-2 text-clay-soft transition-colors hover:text-offwhite"
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

        </div>
      </div>

    </section>
  );
}
