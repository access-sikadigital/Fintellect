"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useInert } from "@/hooks/useInert";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Logomark, Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { nav, site, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Header behaviour:
 *  - transparent over the dark hero, then a solid off-white bar once past it
 *  - hides on scroll down, returns on scroll up
 *  - desktop mega-menu on hover/focus, full-screen panel on mobile
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { stop, start } = useSmoothScroll();

  /* Read inside the scroll handler without re-creating the ScrollTriggers. */
  const menuOpenRef = useRef(false);
  useEffect(() => {
    menuOpenRef.current = open || openMenu !== null;
  }, [open, openMenu]);

  useIsomorphicLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    registerGsap();

    // Publish the real header height so the mobile panel sits flush beneath
    // it. The CSS fallback was a guess, and when it was wrong the top of the
    // menu ended up off-screen.
    const setHeaderHeight = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.getBoundingClientRect().height}px`,
      );
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);

    const ctx = gsap.context(() => {
      // Swap to the solid bar once the hero is behind us.
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onToggle: (self) => setSolid(self.isActive),
      });

      if (prefersReducedMotion()) return;

      // Hide going down, reveal going up — but never while a menu is open.
      ScrollTrigger.create({
        start: "top -200",
        end: 99999,
        onUpdate: (self) => {
          if (menuOpenRef.current) {
            gsap.to(el, { yPercent: 0, duration: 0.4, overwrite: true });
            return;
          }
          gsap.to(el, {
            yPercent: self.direction === 1 ? -100 : 0,
            duration: 0.5,
            ease: "brand-out",
            overwrite: true,
          });
        },
      });
    }, el);

    return () => {
      window.removeEventListener("resize", setHeaderHeight);
      ctx.revert();
    };
  }, []);

  // Lock scrolling behind the mobile panel.
  useIsomorphicLayoutEffect(() => {
    if (open) stop();
    else start();
  }, [open, stop, start]);

  const onDark = !solid && !open;

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[var(--ease-brand)]",
        solid || open
          ? "bg-offwhite/85 backdrop-blur-xl border-b border-ink-12"
          : "bg-transparent",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-6 py-4 lg:py-5">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Fintellect — home"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logomark
            className={cn(
              "h-8 w-auto transition-colors duration-500",
              onDark ? "text-offwhite" : "text-green",
            )}
          />
          <Wordmark
            className={cn(
              "hidden h-[0.5rem] w-auto transition-colors duration-500 sm:block",
              onDark ? "text-offwhite" : "text-green",
            )}
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {nav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "type-body relative inline-block px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-300",
                  onDark
                    ? "text-offwhite/85 hover:text-offwhite"
                    : "text-forest/75 hover:text-green",
                )}
                onFocus={() => setOpenMenu(item.children ? item.label : null)}
              >
                {item.label}
                {item.children && (
                  <Chevron
                    className={cn(
                      "ml-1.5 inline-block h-3.5 w-3.5 align-middle transition-transform duration-300",
                      openMenu === item.label && "rotate-180",
                    )}
                  />
                )}
              </Link>

              {item.children && (
                <MegaMenu
                  open={openMenu === item.label}
                  items={item.children}
                  hubHref={item.href}
                  hubLabel={item.label}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <CallButton
            tone={onDark ? "dark" : "light"}
            size="sm"
            className="hidden md:inline-flex"
          />
          <Button
            href="/contact"
            variant={onDark ? "onDark" : "primary"}
            size="sm"
            icon={false}
            className="hidden sm:inline-flex"
          >
            {site.cta.short}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid h-11 w-11 place-items-center lg:hidden"
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span className="flex w-6 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-[1.5px] w-full origin-center transition-all duration-400 ease-[var(--ease-brand)]",
                  onDark ? "bg-offwhite" : "bg-forest",
                  open && "translate-y-[6.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-full transition-all duration-300",
                  onDark ? "bg-offwhite" : "bg-forest",
                  open && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-full origin-center transition-all duration-400 ease-[var(--ease-brand)]",
                  onDark ? "bg-offwhite" : "bg-forest",
                  open && "-translate-y-[6.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

    </header>

      {/*
        Deliberately a sibling of <header>, not a child. GSAP keeps a
        transform on the header for the hide-on-scroll, and a transformed
        ancestor becomes the containing block for any position:fixed
        descendant — which collapsed this panel to the height of the header
        bar. That is why the mobile menu opened onto nothing.
      */}
      <MobilePanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MegaMenu({
  open,
  items,
  hubHref,
  hubLabel,
}: {
  open: boolean;
  items: { label: string; href: string; note?: string }[];
  hubHref: string;
  hubLabel: string;
}) {
  const ref = useInert<HTMLDivElement>(!open);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-1/2 w-[min(30rem,80vw)] -translate-x-1/2 pt-4",
        "transition-all duration-400 ease-[var(--ease-brand)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <div className="overflow-hidden rounded-panel border border-ink-12 bg-offwhite p-2 shadow-[0_24px_60px_-24px_var(--color-ink-30)]">
        <Link
          href={hubHref}
          className="type-label flex items-center justify-between rounded-card px-4 py-3 text-green transition-colors hover:bg-sand/60"
        >
          All {hubLabel}
          <span aria-hidden="true">→</span>
        </Link>
        <div className="mt-1 grid gap-0.5">
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group/item flex items-baseline justify-between gap-4 rounded-card px-4 py-3 transition-colors duration-200 hover:bg-sand/60"
            >
              <span className="type-body font-medium text-forest">{child.label}</span>
              {child.note && (
                <span className="type-body shrink-0 text-[0.8125rem] text-ink-50">
                  {child.note}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function MobilePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* Build the open/close timeline once, paused. */
  useIsomorphicLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    registerGsap();
    gsap.set(el, { autoAlpha: 0 });

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          el,
          { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.55,
            ease: "brand-out",
          },
        )
        .fromTo(
          "[data-m='item']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "brand-out" },
          0.12,
        )
        .fromTo(
          "[data-m='foot']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "brand-out" },
          0.32,
        );
    }, el);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  /* Play forward on open, reverse on close. */
  useIsomorphicLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    // Removed from the tab order and the a11y tree while closed.
    el.inert = !open;

    const tl = tlRef.current;
    if (!tl) {
      gsap.set(el, { autoAlpha: open ? 1 : 0 });
      return;
    }
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  /* Escape closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      /*
        `invisible opacity-0` is the closed state, and it has to live in CSS
        rather than in the effect below. The panel is an opaque, full-screen
        layer: before hydration runs — and for anyone without JS — it was
        covering every page under `lg` entirely, because the only thing
        hiding it was gsap.set(autoAlpha: 0) after mount.

        GSAP writes visibility and opacity inline when the menu opens, and
        inline styles beat these classes, so the animation is unaffected.
      */
      className="invisible fixed inset-0 z-40 flex flex-col bg-offwhite pt-[var(--header-h,4.5rem)] text-forest opacity-0 lg:hidden"
      aria-hidden={!open}
    >
      {/*
        The scroll lives here, not on the panel, so the CTA footer stays put.
        data-lenis-prevent is essential: Lenis listens on the document and
        preventDefaults wheel/touch, so a nested scroller is dead without it.
      */}
      <div
        data-lenis-prevent
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        <MobileNav key={String(open)} onNavigate={onClose} />
      </div>

      {/* Pinned so the primary action never scrolls out of reach. */}
      <div
        data-m="foot"
        className="shrink-0 border-t border-ink-12 bg-sand/50 px-[var(--container-pad,1.25rem)] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="container-content grid gap-2.5 px-0">
          <Button href={site.cta.href} variant="primary" size="lg" onClick={onClose}>
            {site.cta.primary}
          </Button>
          <CallButton tone="light" size="lg" className="w-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Owns which group is expanded. Keyed on `open` in the panel above, so
 * closing the menu remounts it collapsed — no state-resetting effect.
 */
function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <nav aria-label="Mobile" className="container-content py-2">
      {nav.map((item) =>
        item.children ? (
          <MobileGroup
            key={item.href}
            item={item}
            expanded={openGroup === item.label}
            onToggle={() =>
              setOpenGroup((v) => (v === item.label ? null : item.label))
            }
            onNavigate={onNavigate}
          />
        ) : (
          <div key={item.href} data-m="item" className="border-b border-ink-12">
            <Link
              href={item.href}
              onClick={onNavigate}
              className="type-title flex items-center justify-between py-4 text-[1.25rem] text-forest"
            >
              {item.label}
              <Arrow className="h-5 w-5 shrink-0 text-ink-50" />
            </Link>
          </div>
        ),
      )}
    </nav>
  );
}

/**
 * One collapsible nav group. The hub link and the accordion toggle are
 * separate controls, so tapping the label still reaches the hub page.
 */
function MobileGroup({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const panelId = `m-${item.href.replace(/\W+/g, "-")}`;

  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // No animation on the very first pass — just adopt the resting state.
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: expanded ? "auto" : 0 });
      return;
    }
    if (prefersReducedMotion()) {
      gsap.set(el, { height: expanded ? "auto" : 0 });
      return;
    }

    gsap.to(el, {
      height: expanded ? "auto" : 0,
      duration: 0.45,
      ease: "brand-out",
      overwrite: true,
    });
    if (expanded) {
      gsap.fromTo(
        el.querySelectorAll("[data-m='child']"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.035, ease: "brand-out" },
      );
    }
  }, [expanded]);

  return (
    <div data-m="item" className="border-b border-ink-12">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="type-title flex-1 py-4 text-[1.25rem] text-forest"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
          /* 44px tap target, 34px visible circle — the ring shrinks, the
             touchable area does not. */
          className="grid h-11 w-11 shrink-0 place-items-center"
        >
          <span
            className={cn(
              "grid h-[2.125rem] w-[2.125rem] place-items-center rounded-full border transition-colors duration-300",
              expanded
                ? "border-green bg-green text-offwhite"
                : "border-ink-30 text-forest",
            )}
          >
            <Chevron
              className={cn(
                "h-5 w-5 transition-transform duration-400 ease-[var(--ease-brand)]",
                expanded && "rotate-180",
              )}
            />
          </span>
        </button>
      </div>

      <div ref={wrapRef} id={panelId} className="overflow-hidden">
        <div className="grid gap-0.5 pb-3">
          <Link
            href={item.href}
            onClick={onNavigate}
            data-m="child"
            className="type-label rounded-card bg-sand/50 px-3 py-2.5 text-green"
          >
            All {item.label.toLowerCase()}
          </Link>
          {item.children?.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={onNavigate}
              data-m="child"
              className="type-body flex items-baseline justify-between gap-3 rounded-card px-3 py-2.5 text-forest/80"
            >
              <span>{c.label}</span>
              {c.note && (
                <span className="type-body shrink-0 text-[0.75rem] text-ink-50">
                  {c.note}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
