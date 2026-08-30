"use client";

import Link from "next/link";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "onDark" | "outline" | "outlineDark" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
};

/*
 * CTA styling follows the usage guidelines page: a solid dark-green pill on
 * light surfaces, off-white on dark ones. Label is Inter, uppercase, with
 * modest tracking — short enough that it never reads as a label chip.
 */
const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-pill " +
  "font-sans font-semibold uppercase tracking-[0.08em] whitespace-nowrap " +
  "transition-colors duration-300 ease-[var(--ease-brand)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.6875rem]",
  md: "px-7 py-3.5 text-[0.75rem]",
  lg: "px-9 py-4.5 text-[0.8125rem]",
};

const variants: Record<Variant, string> = {
  primary: "bg-forest text-offwhite hover:text-offwhite",
  onDark: "bg-offwhite text-forest hover:text-forest",
  outline: "border border-ink-30 text-forest hover:text-offwhite",
  outlineDark: "border border-paper-40 text-offwhite hover:text-forest",
  ghost: "text-forest hover:text-green",
};

/* The fill that sweeps up on hover. Colour flips per variant. */
const sweep: Record<Variant, string> = {
  primary: "bg-green",
  onDark: "bg-sand",
  outline: "bg-forest",
  outlineDark: "bg-offwhite",
  ghost: "bg-transparent",
};

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    children,
    href,
    variant = "primary",
    size = "md",
    className,
    icon = true,
    magnetic = false,
    type = "button",
    onClick,
    ariaLabel,
  },
  ref,
) {
  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-0 translate-y-full rounded-pill transition-transform duration-500",
            "ease-[var(--ease-brand)] group-hover/btn:translate-y-0",
            sweep[variant],
          )}
        />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className="relative z-10 grid h-4 w-4 place-items-center overflow-hidden"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 transition-transform duration-400 ease-[var(--ease-brand)] group-hover/btn:translate-x-4"
          >
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="absolute h-3.5 w-3.5 -translate-x-4 transition-transform duration-400 ease-[var(--ease-brand)] group-hover/btn:translate-x-0"
          >
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  const el = href ? (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={classes}
      aria-label={ariaLabel}
    >
      {inner}
    </Link>
  ) : (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
});
