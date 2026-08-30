"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type SmoothScrollApi = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so that Lenis and
 * ScrollTrigger share a single requestAnimationFrame loop. Running two loops
 * is the usual cause of jittery pinned sections.
 *
 * Reduced-motion visitors get native scrolling and no Lenis instance at all.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  // Held in state as well as a ref: the ref keeps the callbacks stable,
  // the state lets consumers re-render when the instance appears.
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();

    // Signals to CSS that JS is live, so animated elements may start hidden.
    document.documentElement.classList.add("js");

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.05,
      // Slightly long, gentle tail. Matches the brand easing.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch feels better than an emulated version.
      syncTouch: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts change layout height; recalculate once settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  /* Stable callbacks — they read the ref, so their identity never changes. */
  const scrollTo = useCallback<SmoothScrollApi["scrollTo"]>(
    (target, offset = 0) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
      }
      // Reduced motion, or Lenis not yet mounted.
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (el instanceof HTMLElement) {
        window.scrollTo({ top: el.offsetTop + offset, behavior: "auto" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior: "auto" });
      }
    },
    [],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ lenis, scrollTo, stop, start }),
    [lenis, scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
