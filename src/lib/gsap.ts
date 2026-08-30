"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";

let registered = false;

/**
 * Registers every GSAP plugin the site uses, exactly once, on the client.
 * Also defines the brand easing curves so motion matches the identity:
 * confident entrances, soft settles, nothing bouncy.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, Observer, Flip);

  CustomEase.create("brand", "0.22, 1, 0.36, 1");
  CustomEase.create("brand-in", "0.64, 0, 0.78, 0");
  CustomEase.create("brand-out", "0.16, 1, 0.3, 1");

  gsap.defaults({ ease: "brand", duration: 0.9 });

  // Never fight the browser's scroll restoration on reload.
  ScrollTrigger.config({ ignoreMobileResize: true });

  registered = true;
}

/** True when the visitor has asked for reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, Observer, Flip };
