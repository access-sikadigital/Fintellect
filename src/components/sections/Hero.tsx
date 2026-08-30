"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/ui/Logo";
import { site } from "@/data/site";

/**
 * The hero.
 *
 * Sequence on load: label → headline lines rise out of their masks → the rule
 * under "runaround" draws → supporting copy and actions fade up → the scroll
 * cue appears. On scroll the whole block drifts and dims while the image band
 * beneath opens from a slot to full bleed.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    registerGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        // Entrance
        const tl = gsap.timeline({ delay: 0.15 });

        tl.from("[data-hero='label']", { opacity: 0, y: 20, duration: 0.9 })
          .from(
            "[data-hero='rule']",
            { drawSVG: "0%", duration: 1.1, ease: "brand-out" },
            0.95,
          )
          .from(
            "[data-hero='copy'] > *",
            { opacity: 0, y: 28, duration: 1, stagger: 0.1 },
            0.85,
          )
          .from(
            "[data-hero='stat']",
            { opacity: 0, y: 28, duration: 1 },
            1.0,
          )
          .from("[data-hero='cue']", { opacity: 0, duration: 0.8 }, 1.3)
          .from(
            "[data-hero='ghost']",
            { opacity: 0, scale: 0.9, duration: 1.6, ease: "brand-out" },
            0.2,
          );

        // Drift the content as the hero leaves
        gsap.to("[data-hero='content']", {
          yPercent: 14,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Background motifs move at their own pace
        gsap.to("[data-hero='ghost']", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        // The image band opens as it enters
        gsap.fromTo(
          "[data-hero='band-inner']",
          { clipPath: "inset(0% 22% 0% 22%)", borderRadius: "2rem", scale: 1.18 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            borderRadius: "0rem",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-hero='band']",
              start: "top 92%",
              end: "top 18%",
              scrub: 0.6,
            },
          },
        );
      }

      // Endless slow rotation on the seal
      if (!reduced) {
        gsap.to("[data-hero='seal']", {
          rotate: 360,
          duration: 26,
          ease: "none",
          repeat: -1,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="on-dark grain relative isolate overflow-hidden bg-forest text-offwhite"
      aria-labelledby="hero-heading"
    >
      {/* Background motifs, drawn only from the brand graphic elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-dark)" }}
        />
        <Logomark
          data-hero="ghost"
          className="absolute -right-[12%] top-1/2 h-[92vh] w-auto -translate-y-1/2 text-green/15"
        />
        <div className="absolute -left-[14%] top-[14%] h-[42vw] w-[42vw] rounded-full border border-paper-10" />
        <div className="absolute -left-[8%] top-[26%] h-[26vw] w-[26vw] rounded-full bg-green/20 blur-[2px]" />
      </div>

      <div
        data-hero="content"
        className="container-wide relative flex min-h-[100svh] flex-col justify-center pt-28 pb-12 lg:pt-32 lg:pb-16"
      >
        {/* Eyebrow */}
        <div
          data-hero="label"
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="type-label text-sand">
            Independent mortgage &amp; finance brokers
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-paper-20" />
          <span className="type-label text-paper-40">ACL {site.acl}</span>
        </div>

        {/* Headline */}
        <h1 id="hero-heading" className="type-hero mt-6 lg:mt-8">
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
              without the runaround.
            </SplitLines>
            {/* Hand-drawn rule under the emphasised line */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 12"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-[0.14em] w-full overflow-visible"
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

        {/* Supporting row */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1.15fr_auto] lg:items-end lg:gap-16">
          <div data-hero="copy" className="grid gap-7">
            <p className="type-subtitle max-w-[46ch] font-normal text-paper-60">
              We compare the lenders that actually fit your situation, negotiate
              on your behalf and handle the paperwork — so you get a sharper
              outcome without the chasing.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="onDark" size="lg" magnetic>
                Get your free loan health check
              </Button>
              <a
                href={site.phoneHref}
                data-cursor="Call"
                className="type-label px-3 py-4 text-sand transition-colors duration-300 hover:text-offwhite"
              >
                {site.phone}
              </a>
            </div>
          </div>

          {/* The speed claim — the strongest differentiator in the brief */}
          <div
            data-hero="stat"
            className="relative flex items-center gap-5 rounded-panel border border-paper-20 bg-paper-10 px-7 py-6 backdrop-blur-sm"
          >
            <div
              data-hero="seal"
              aria-hidden="true"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-sand/50"
            >
              <span className="h-2 w-2 rounded-full bg-sand" />
            </div>
            <div>
              <p className="type-title text-[2.5rem] leading-none text-offwhite numeric">
                ~{site.callbackMinutes}
                <span className="type-label ml-1.5 align-middle text-sand">min</span>
              </p>
              <p className="type-body mt-1.5 max-w-[22ch] text-[0.875rem] text-paper-60">
                Typical callback during business hours. Not a ticket number.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          type="button"
          data-hero="cue"
          onClick={() => scrollTo("#situations", -40)}
          className="group mt-10 flex w-fit items-center gap-3 lg:mt-14"
          aria-label="Scroll to see how we can help"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-paper-20 transition-colors duration-300 group-hover:border-sand">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-sand">
              <path
                d="M8 2v11M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-y-0.5"
              />
            </svg>
          </span>
          <span className="type-label text-paper-40 transition-colors group-hover:text-sand">
            See where we help
          </span>
        </button>
      </div>

      {/* Image band that opens to full bleed */}
      <div data-hero="band" className="relative z-10 -mb-px">
        <div
          data-hero="band-inner"
          className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[21/7]"
        >
          <Image
            src="/brand/photography/hero-band.webp"
            alt="A family walking together towards their home on a sunny day"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/15 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
