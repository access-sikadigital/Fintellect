"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  separator?: boolean;
};

/**
 * Counts a figure up when it scrolls into view.
 *
 * FIN-05 — the resting state is the REAL number, not zero.
 *
 * The previous version rendered 0 on the server and only reached the true
 * figure once the scroll animation fired, so a slow load, a JS failure or a
 * reduced-motion preference left the visitor looking at "0 min / 0 / 0% / $0".
 * For a page whose whole job is credibility, that was the worst possible
 * failure mode.
 *
 * Now the final value is server-rendered and is what the element resets to.
 * The animation counts up *from zero to that value* only when it is safe to
 * do so, and if anything goes wrong the real number is already on screen.
 */
export function Counter({
  value,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  separator = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    if (!separator) return fixed;
    const [int, dec] = fixed.split(".");
    const withSeps = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec ? `${withSeps}.${dec}` : withSeps;
  };

  const finalText = `${prefix}${format(value)}${suffix}`;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    // Reduced motion: the number is already correct in the markup. Leave it.
    if (prefersReducedMotion()) return;

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "brand-out",
        onUpdate: () => {
          el.textContent = `${prefix}${format(counter.n)}${suffix}`;
        },
        // Whatever happens, land on the true figure.
        onComplete: () => {
          el.textContent = finalText;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          // If the element is already past the trigger point on load, fire
          // immediately rather than waiting for a scroll that may never come.
          onRefresh: (self) => {
            if (self.progress > 0) el.textContent = finalText;
          },
        },
      });
    }, el);

    return () => {
      ctx.revert();
      // ctx.revert() restores the server-rendered text, which is the real
      // figure — so there is no path back to zero.
      el.textContent = finalText;
      ScrollTrigger.refresh();
    };
  }, [value, duration, decimals, prefix, suffix, separator, finalText]);

  return (
    <span ref={ref} className={cn("numeric", className)}>
      {finalText}
    </span>
  );
}
