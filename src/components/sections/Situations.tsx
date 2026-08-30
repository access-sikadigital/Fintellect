"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/*
 * The situations Fintellect wins, in the borrower's language rather than the
 * product name — per the home page brief in the website scope.
 */
const situations = [
  {
    n: "01",
    title: "Your rate crept up and nobody called",
    service: "Refinance",
    href: "/home-loans/refinance",
    detail:
      "We check what you're on now against what you could be on, and tell you straight whether moving is worth the switching costs.",
    image: "/brand/photography/sit-refinance.webp",
  },
  {
    n: "02",
    title: "You work for yourself and the bank said no",
    service: "Self-employed & low doc",
    href: "/home-loans/self-employed",
    detail:
      "Alt-doc and low-doc lenders read your numbers differently. Eighteen months of trading is often enough — the majors just won't tell you that.",
    image: "/brand/photography/sit-self-employed.webp",
  },
  {
    n: "03",
    title: "You're a doctor paying LMI you don't owe",
    service: "Medical & professionals",
    href: "/home-loans/doctors-medical-professionals",
    detail:
      "Specialists, registrars and residents can borrow up to 95% with no lenders mortgage insurance through the major banks. Accountants and lawyers have their own waivers.",
    image: "/brand/photography/sit-professionals.webp",
  },
  {
    n: "04",
    title: "You need the equipment on site next week",
    service: "Asset & equipment finance",
    href: "/asset-finance/equipment-finance",
    detail:
      "Trucks, excavators and machinery, new or used. Two years of ABN and GST registration is usually the whole conversation.",
    image: "/brand/photography/sit-asset.webp",
  },
] as const;

export function Situations() {
  const root = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    const preview = previewRef.current;
    if (!el || !preview) return;

    registerGsap();

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });

    const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "brand-out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "brand-out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  // Show / hide the floating preview when a row is entered or left.
  useIsomorphicLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (prefersReducedMotion()) return;

    gsap.to(preview, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      duration: 0.5,
      ease: "brand-out",
      overwrite: "auto",
    });
  }, [active]);

  return (
    <section
      ref={root}
      id="situations"
      className="section-y relative bg-offwhite"
      aria-labelledby="situations-heading"
    >
      <div className="container-wide">
        <div className="grid gap-6 border-b border-ink-12 pb-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-green">Where we&rsquo;re strongest</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="situations-heading"
              className="type-display mt-5 max-w-[13ch] text-forest"
            >
              Four situations we solve every week.
            </SplitLines>
          </div>
          <Reveal variant="rise" delay={0.1} className="lg:pb-3">
            <p className="type-body max-w-[46ch] text-ink-70">
              Pick the one that sounds like you. If none of them do, call anyway
              — the first conversation is where we work out whether we&rsquo;re
              the right fit.
            </p>
          </Reveal>
        </div>

        {/* Rows */}
        <ul className="relative">
          {situations.map((s, i) => (
            <li key={s.href}>
              <Link
                href={s.href}
                data-cursor="none"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group/row relative grid items-start gap-x-8 gap-y-4 border-b border-ink-12 py-9",
                  "transition-[opacity,color] duration-500 ease-[var(--ease-brand)]",
                  "md:grid-cols-[4rem_1fr_auto] lg:py-11",
                  active !== null && active !== i && "opacity-40",
                )}
              >
                <span className="type-label pt-1.5 text-green numeric">{s.n}</span>

                <div className="grid gap-3">
                  <h3 className="type-title text-[clamp(1.5rem,2.9vw,2.5rem)] text-forest transition-transform duration-500 ease-[var(--ease-brand)] md:group-hover/row:translate-x-3">
                    {s.title}
                  </h3>
                  <p className="type-body max-w-[58ch] text-ink-70 transition-transform duration-500 ease-[var(--ease-brand)] md:group-hover/row:translate-x-3">
                    {s.detail}
                  </p>
                  {/* Mobile shows the image inline; desktop uses the cursor preview */}
                  <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-card md:hidden">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <span className="type-label flex items-center gap-2 pt-2 text-green">
                  {s.service}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover/row:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview, desktop only */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[21rem] w-[16.8rem] overflow-hidden rounded-panel opacity-0 shadow-[0_30px_80px_-30px_var(--color-ink-50)] [@media(pointer:fine)]:block"
      >
        {situations.map((s, i) => (
          <Image
            key={s.href}
            src={s.image}
            alt=""
            fill
            sizes="17rem"
            className={cn(
              "object-cover transition-opacity duration-400",
              active === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
    </section>
  );
}
