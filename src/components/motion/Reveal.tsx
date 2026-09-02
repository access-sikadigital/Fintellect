"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: "rise" | "fade" | "clip";
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  distance?: number;
  [key: string]: unknown;
};

/**
 * The workhorse scroll reveal. Every non-headline element enters through this
 * so timing and easing stay consistent.
 *
 * It hides its target before animating it in, which means a reveal that never
 * fires leaves content invisible — and, worse, leaves buttons inside it
 * unclickable. John reported exactly that: buttons that did nothing and blank
 * bands mid-scroll. Three guards now make that impossible:
 *
 *   1. Anything already above the trigger line on load is shown immediately,
 *      rather than waiting for a scroll that may never happen.
 *   2. A failsafe timer forces the final state if the trigger has not fired
 *      within two seconds — a stalled image, a slow device, a Lenis/
 *      ScrollTrigger desync.
 *   3. Cleanup always restores the visible state.
 *
 * The element is never left hidden. Worst case it appears without animating.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "rise",
  delay = 0,
  duration = 0.8,
  stagger,
  start = "top 92%",
  distance = 28,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    const targets: Element[] =
      stagger !== undefined ? Array.from(el.children) : [el];
    if (!targets.length) return;

    const show = () =>
      gsap.set(targets, { clearProps: "opacity,transform,clipPath", opacity: 1 });

    if (prefersReducedMotion()) {
      show();
      return;
    }

    const from: gsap.TweenVars =
      variant === "fade"
        ? { opacity: 0 }
        : variant === "clip"
          ? { clipPath: "inset(0 0 100% 0)", opacity: 1 }
          : { opacity: 0, y: distance };

    let fired = false;
    let failsafe = 0;

    const ctx = gsap.context(() => {
      gsap.set(targets, from);

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        clipPath: variant === "clip" ? "inset(0 0 0% 0)" : undefined,
        duration,
        delay,
        ease: "brand-out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          onEnter: () => {
            fired = true;
          },
          // Already past the trigger line when the page settles — show it now
          // instead of waiting for a scroll that might never come.
          onRefresh: (self) => {
            if (self.progress > 0 && !fired) {
              fired = true;
              show();
            }
          },
        },
      });

      // Nothing has fired in two seconds: reveal regardless.
      failsafe = window.setTimeout(() => {
        if (!fired) show();
      }, 2000);
    }, el);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      show();
      ScrollTrigger.refresh();
    };
  }, [variant, delay, duration, stagger, start, distance]);

  return (
    <Tag ref={ref} {...rest} className={cn(className)}>
      {children}
    </Tag>
  );
}
