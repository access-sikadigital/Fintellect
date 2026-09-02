"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

/**
 * Makes #anchor links actually work.
 *
 * Lenis owns the scroll position, so the browser's native anchor jump is
 * either ignored or immediately snapped back — the URL gains the hash and
 * nothing moves. Every hash destination therefore has to be driven through
 * Lenis by hand. Three entry points need covering:
 *
 *   1. a click on a link whose target is on the page already
 *   2. arriving on a page with a hash in the URL (cross-page links)
 *   3. back/forward between hashes
 *
 * Everything lands the target below the fixed header rather than under it.
 */
export function ScrollToHash() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const headerOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--header-h",
      );
      const h = parseFloat(raw) || 72;
      return -(h + 16);
    };

    const go = (hash: string, smooth: boolean) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return false;
      const el = document.getElementById(id);
      if (!el) return false;
      // A frame's grace so layout has settled after a route change.
      requestAnimationFrame(() =>
        scrollTo(el, smooth ? headerOffset() : headerOffset()),
      );
      return true;
    };

    // 2 + 3 — hash already in the URL, or changed by history navigation.
    if (window.location.hash) go(window.location.hash, false);
    const onHashChange = () => go(window.location.hash, true);
    window.addEventListener("hashchange", onHashChange);

    // 1 — intercept in-page anchor clicks before the browser handles them.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || !href.includes("#")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const [path, hash] = href.split("#");
      if (!hash) return;
      // Only handle links that resolve to the current page.
      if (path && path !== pathname && path !== `${pathname}/`) return;

      if (go(`#${hash}`, true)) {
        e.preventDefault();
        history.pushState(null, "", `#${hash}`);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [pathname, scrollTo]);

  return null;
}
