import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The primary CTA and the call button, side by side and the same width.
 *
 * They used to sit in a flex row and size to their own labels, so "Get your
 * free assessment" ran wide while the phone number sat short beside it — two
 * pills of obviously different lengths.
 *
 * An inline grid with equal columns fixes that: `minmax(max-content, 1fr)`
 * gives both tracks the same width — the wider of the two — and the
 * `max-content` floor means neither can ever be squeezed narrower than its
 * own label. `w-fit` keeps the pair sized to its contents rather than
 * stretching across the band.
 *
 * Below `sm` the two stack, each filling the column.
 *
 * Buttons must be passed `className="w-full"` to fill their column — a
 * `Button` is `inline-flex`, and a magnetic one sits inside a wrapper, so
 * neither stretches on its own.
 */
export function ActionPair({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-fit grid-cols-1 gap-3",
        "sm:grid-flow-col sm:grid-cols-none sm:[grid-auto-columns:minmax(max-content,1fr)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
