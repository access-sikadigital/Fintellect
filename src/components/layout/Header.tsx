"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useInert } from "@/hooks/useInert";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Logomark, Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { nav, site } from "@/data/site";
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

    return () => ctx.revert();
  }, []);

  // Lock scrolling behind the mobile panel.
  useIsomorphicLayoutEffect(() => {
    if (open) stop();
    else start();
  }, [open, stop, start]);

  const onDark = !solid && !open;

  return (
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
                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-1.5 inline-block text-[0.6em] transition-transform duration-300",
                      openMenu === item.label && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
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
          <a
            href={site.phoneHref}
            className={cn(
              "type-label hidden transition-colors duration-300 md:inline-block",
              onDark ? "text-sand hover:text-offwhite" : "text-green hover:text-forest",
            )}
          >
            {site.phone}
          </a>
          <Button
            href="/contact"
            variant={onDark ? "onDark" : "primary"}
            size="sm"
            icon={false}
            className="hidden sm:inline-flex"
          >
            Free loan health check
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

      <MobilePanel open={open} onClose={() => setOpen(false)} />
    </header>
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

function MobilePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useInert<HTMLDivElement>(!open);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      className={cn(
        "fixed inset-x-0 top-[var(--header-h,4.5rem)] bottom-0 overflow-y-auto bg-offwhite lg:hidden",
        "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="container-content flex min-h-full flex-col gap-8 py-10">
        <nav aria-label="Mobile" className="grid gap-2">
          {nav.map((item, i) => (
            <div
              key={item.href}
              className="border-b border-ink-12 pb-4"
              style={{
                transitionDelay: open ? `${100 + i * 55}ms` : "0ms",
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "var(--ease-brand)",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(1rem)",
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="type-title block text-[1.75rem] text-forest"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {item.children.slice(0, 5).map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onClose}
                      className="type-body text-[0.9375rem] text-ink-70 hover:text-green"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto grid gap-3">
          <Button href="/contact" variant="primary" size="lg" onClick={onClose}>
            Free loan health check
          </Button>
          <a
            href={site.phoneHref}
            className="type-label block py-3 text-center text-green"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
