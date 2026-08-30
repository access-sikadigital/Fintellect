"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "rise" lifts and fades. "fade" only fades. "clip" wipes upward. */
  variant?: "rise" | "fade" | "clip";
  delay?: number;
  duration?: number;
  /** Animate direct children in sequence instead of the element itself. */
  stagger?: number;
  start?: string;
  distance?: number;
  /** Anything else is forwarded to the rendered element. */
  [key: string]: unknown;
};

/**
 * The workhorse scroll reveal. Every non-headline element on the site enters
 * through this so timing and easing stay consistent.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "rise",
  delay = 0,
  duration = 1,
  stagger,
  start = "top 88%",
  distance = 40,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all", opacity: 1 });
      return;
    }

    const targets: Element[] =
      stagger !== undefined ? Array.from(el.children) : [el];

    const from: gsap.TweenVars =
      variant === "fade"
        ? { opacity: 0 }
        : variant === "clip"
          ? { clipPath: "inset(0 0 100% 0)", opacity: 1 }
          : { opacity: 0, y: distance };

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
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, start, distance]);

  return (
    <Tag ref={ref} {...rest} className={cn(className)}>
      {children}
    </Tag>
  );
}
