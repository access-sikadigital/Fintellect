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
  /** Insert thousands separators. */
  separator?: boolean;
};

/** Counts a figure up when it scrolls into view. Tabular figures, no reflow. */
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

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${format(value)}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "brand-out",
        onUpdate: () => {
          el.textContent = `${prefix}${format(counter.n)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [value, duration, decimals, prefix, suffix, separator]);

  return (
    <span ref={ref} className={cn("numeric", className)}>
      {prefix}
      {format(0)}
      {suffix}
    </span>
  );
}
