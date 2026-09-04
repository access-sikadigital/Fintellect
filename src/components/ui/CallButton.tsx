import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The phone number as a distinct button rather than a bare link.
 *
 * John, 2 Sep: "I don't like how this is just a number just plonked there…
 * let's make it more distinct. That way I can track that number as well."
 *
 * A real button is also what makes call tracking practical — dynamic number
 * insertion needs a stable element to swap, and click-to-call events need
 * something unambiguous to bind to. `data-call-cta` is that hook.
 */
export function CallButton({
  tone = "light",
  size = "md",
  className,
  label = "Call",
}: {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const sizes = {
    sm: "px-4 py-2.5 text-[0.75rem] gap-2",
    md: "px-6 py-3.5 text-[0.8125rem] gap-2.5",
    lg: "px-7 py-4.5 text-[0.8125rem] gap-3",
  } as const;

  return (
    <a
      href={site.phoneHref}
      data-call-cta
      aria-label={`${label} ${site.phone}`}
      className={cn(
        "group/call inline-flex items-center justify-center rounded-pill border font-sans font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-300",
        sizes[size],
        tone === "dark"
          ? "border-sand/50 text-sand hover:border-sand hover:bg-sand hover:text-forest"
          : "border-clay-60 text-clay hover:border-clay hover:bg-clay hover:text-offwhite",
        className,
      )}
    >
      <Icon
        name="phone"
        className="h-4 w-4 transition-transform duration-400 ease-[var(--ease-brand)] group-hover/call:-rotate-12"
      />
      {site.phone}
    </a>
  );
}
