"use client";

import { useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * A single trailing ring that follows the pointer and reacts to what is under
 * it: it grows over links and buttons, and shows a label over elements
 * carrying `data-cursor="…"`.
 *
 * Purely decorative — the native cursor is never hidden, so nobody loses their
 * pointer, and the whole thing is skipped on touch and reduced motion.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    registerGsap();

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const xTo = gsap.quickTo(ring, "x", { duration: 0.42, ease: "brand-out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.42, ease: "brand-out" });

    let visible = false;

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      if (!visible) {
        visible = true;
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4 });
      }

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select",
      );

      const raw = el?.dataset.cursor;
      // data-cursor="none" hides the ring — used where an element already has
      // its own hover affordance, such as the image preview on the home page.
      const hidden = raw === "none";
      const text = hidden ? undefined : raw;
      const interactive = Boolean(el);

      gsap.to(ring, {
        scale: hidden ? 0 : text ? 3.2 : interactive ? 1.9 : 1,
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

      if (label.textContent !== (text ?? "")) label.textContent = text ?? "";
      gsap.to(label, { opacity: text ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };

    const onLeave = () => {
      visible = false;
      gsap.to(ring, { scale: 0, opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([ring, label]);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-9 w-9 place-items-center rounded-full border border-green-60 [@media(pointer:fine)]:grid"
      style={{ willChange: "transform" }}
    >
      <span
        ref={labelRef}
        className="type-label text-[0.4rem] leading-none text-offwhite opacity-0"
      />
    </div>
  );
}
