"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  /** Fade the leading and trailing edges into the section background. */
  fade?: boolean;
};

/**
 * Infinite horizontal marquee. Driven by CSS rather than a ScrollTrigger, so
 * it keeps moving while the page is still and costs nothing on the main thread.
 * The content is duplicated once and translated by exactly -50%.
 */
export function Marquee({
  children,
  className,
  speed = 45,
  reverse = false,
  fade = false,
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee relative w-full overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className="marquee-track"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
