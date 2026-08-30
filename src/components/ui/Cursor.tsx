"use client";

import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * A trailing ring that follows the pointer and reacts to what is under it:
 * it grows over links and buttons, and shows a label over elements carrying
 * `data-cursor="…"`. `data-cursor="none"` suppresses it entirely, for
 * elements that already have their own hover affordance.
 *
 * Structure matters here. The wrapper only ever translates; the circle is the
 * only thing that scales; the label is a sibling of the circle at its real
 * font size. Scaling a parent that contains text rasterises the glyphs at the
 * pre-scale size and stretches the bitmap, which is what made the earlier
 * version blurry — the label was drawn at 6.4px and enlarged 3.2 times.
 *
 * Purely decorative — the native cursor is never hidden, and the whole thing
 * is skipped on touch and under reduced motion.
 */
export function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!wrap || !circle || !label) return;

    registerGsap();

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    gsap.set(wrap, { xPercent: -50, yPercent: -50 });
    gsap.set(circle, { scale: 0, opacity: 0 });

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.42, ease: "brand-out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.42, ease: "brand-out" });

    let visible = false;
    let currentLabel = "";

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select",
      );

      const raw = el?.dataset.cursor;
      const hidden = raw === "none";
      const text = hidden ? "" : (raw ?? "");
      const interactive = Boolean(el) && !hidden;

      if (!visible && !hidden) {
        visible = true;
        gsap.to(circle, { opacity: 1, duration: 0.4 });
      }

      gsap.to(circle, {
        // Sized so a short label sits comfortably inside the circle.
        scale: hidden ? 0 : text ? 3 : interactive ? 1.9 : 1,
        opacity: hidden ? 0 : 1,
        backgroundColor: text
          ? "var(--color-green)"
          : interactive
            ? "var(--color-green-15)"
            : "transparent",
        borderColor: text ? "var(--color-green)" : "var(--color-green-60)",
        duration: 0.4,
        overwrite: "auto",
      });

      if (currentLabel !== text) {
        currentLabel = text;
        // Swap the text only while the label is invisible, so it never
        // changes mid-fade.
        gsap.to(label, {
          opacity: text ? 1 : 0,
          duration: 0.25,
          overwrite: "auto",
          onStart: () => {
            if (text) label.textContent = text;
          },
          onComplete: () => {
            if (!text) label.textContent = "";
          },
        });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to(circle, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([wrap, circle, label]);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-9 w-9 [@media(pointer:fine)]:block"
      style={{ willChange: "transform" }}
    >
      {/* Only this scales. It holds no text, so nothing can blur. */}
      <span
        ref={circleRef}
        className="absolute inset-0 block rounded-full border border-green-60"
      />
      {/* Rendered at its true size and never scaled — stays sharp. */}
      <span
        ref={labelRef}
        className="type-label absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.6875rem] leading-none whitespace-nowrap text-offwhite opacity-0"
      />
    </div>
  );
}
