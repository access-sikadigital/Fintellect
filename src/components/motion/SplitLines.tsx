"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type SplitLinesProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the first line moves, in seconds. */
  delay?: number;
  /** Gap between consecutive lines, in seconds. */
  stagger?: number;
  /** Play on mount instead of waiting for the element to scroll into view. */
  immediate?: boolean;
  /** Where in the viewport the reveal fires. */
  start?: string;
  /** Anything else is forwarded to the rendered element (id, aria-*, …). */
  [key: string]: unknown;
};

/**
 * Reveals a block of text one line at a time, each line rising out of its own
 * mask. This is the site's signature headline entrance.
 *
 * Splitting waits for webfonts so lines never break against a fallback metric,
 * and re-splits on resize via SplitText's autoSplit.
 */
export function SplitLines({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  start = "top 90%",
  ...rest
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let trigger: ScrollTrigger | null = null;
    let cancelled = false;

    /*
     * Failsafe. The element starts at opacity 0 so the split is never seen
     * mid-construction. If anything goes wrong — fonts stall, SplitText
     * throws — this guarantees the copy still appears.
     */
    const failsafe = window.setTimeout(() => {
      if (!cancelled && ref.current) gsap.set(ref.current, { opacity: 1 });
    }, 2500);

    const run = () => {
      if (cancelled || !ref.current) return;

      try {
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line-inner",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 });

            tween = gsap.from(self.lines, {
              yPercent: 118,
              duration: 1.1,
              ease: "brand-out",
              stagger,
              delay: immediate ? delay : 0,
              paused: !immediate,
            });

            if (!immediate && tween) {
              trigger = ScrollTrigger.create({
                trigger: el,
                start,
                once: true,
                onEnter: () => {
                  gsap.delayedCall(delay, () => tween?.play());
                },
              });
            }

            return tween;
          },
        });
      } catch {
        gsap.set(el, { opacity: 1 });
      }
    };

    // Fonts first — line breaks depend on the real typeface metrics.
    if (document.fonts?.status === "loaded") {
      run();
    } else {
      document.fonts?.ready.then(run).catch(run);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      trigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [delay, stagger, immediate, start]);

  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn("[.js_&]:opacity-0", className)}
      // Guards against a flash if JS fails after the class is applied.
      style={{ willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
