"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Positive drifts down, negative drifts up. Fraction of element height. */
  speed?: number;
  /** Scale the element up slightly so parallax never reveals an edge. */
  overscan?: boolean;
};

/** Scroll-linked vertical drift. Used on imagery and background motifs. */
export function Parallax({
  children,
  className,
  speed = 0.18,
  overscan = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={overscan ? { scale: 1 + Math.abs(speed) } : undefined}
    >
      {children}
    </div>
  );
}
