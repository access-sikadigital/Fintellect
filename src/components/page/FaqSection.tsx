"use client";

import { useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import type { Faq } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion. Answers are always in the server-rendered HTML — collapsing
 * happens after mount — so the FAQPage schema and the visible copy match.
 */
export function FaqSection({
  faqs,
  heading = "Questions people actually ask",
  eyebrow = "FAQ",
  tone = "light",
}: {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <section
      className={cn("section-y", dark ? "on-dark bg-forest text-offwhite" : "bg-offwhite")}
      aria-labelledby="faq-heading"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-[auto_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal variant="fade">
            <p className={cn("type-label", dark ? "text-sand" : "text-green")}>{eyebrow}</p>
          </Reveal>
          <SplitLines
            as="h2"
            id="faq-heading"
            className={cn(
              "type-title mt-5 max-w-[13ch] text-[clamp(1.75rem,3vw,2.75rem)]",
              dark ? "text-offwhite" : "text-forest",
            )}
          >
            {heading}
          </SplitLines>
        </div>

        <ul className="grid">
          {faqs.map((f, i) => (
            <FaqRow
              key={f.q}
              faq={f}
              index={i}
              dark={dark}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqRow({
  faq,
  index,
  open,
  onToggle,
  dark,
}: {
  faq: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
  dark: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      mounted.current = true;
      return;
    }

    // First pass sets state without animating, so nothing flashes on load.
    if (!mounted.current) {
      gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      mounted.current = true;
      return;
    }

    const tween = gsap.to(panel, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.5,
      ease: "brand-out",
      overwrite: "auto",
    });
    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <li className={cn("border-b first:border-t", dark ? "border-paper-20" : "border-ink-12")}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              "type-subtitle font-sans text-[clamp(1rem,1.5vw,1.25rem)] transition-colors duration-300",
              dark
                ? open
                  ? "text-offwhite"
                  : "text-paper-60 group-hover:text-offwhite"
                : open
                  ? "text-forest"
                  : "text-ink-70 group-hover:text-forest",
            )}
          >
            {faq.q}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
              dark ? "border-paper-20 group-hover:border-sand" : "border-ink-30 group-hover:border-green",
            )}
          >
            <span className={cn("absolute h-px w-2.5", dark ? "bg-sand" : "bg-green")} />
            <span
              className={cn(
                "absolute h-2.5 w-px transition-transform duration-400 ease-[var(--ease-brand)]",
                dark ? "bg-sand" : "bg-green",
                open && "scale-y-0",
              )}
            />
          </span>
        </button>
      </h3>
      <div ref={panelRef} id={`faq-panel-${index}`} className="overflow-hidden">
        <p className={cn("type-body max-w-[68ch] pb-7", dark ? "text-paper-60" : "text-ink-70")}>
          {faq.a}
        </p>
      </div>
    </li>
  );
}
