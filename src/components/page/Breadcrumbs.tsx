import { site } from "@/data/site";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb plus the BreadcrumbList schema the scope requires. */
/**
 * Breadcrumb STRUCTURED DATA only — no visible trail.
 *
 * The visible crumbs were removed at the client's request: on mobile they ate
 * a line or two above the fold for navigation nobody used. The BreadcrumbList
 * JSON-LD stays, because that is what Google reads to build the breadcrumb
 * line in the search result — it costs no layout and losing it would be a
 * needless SEO regression.
 */
export function BreadcrumbSchema({ trail }: { trail: Crumb[] }) {
  const items = [{ label: "Home", href: "/" }, ...trail];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `https://${site.domain}${c.href}`,
          })),
        }),
      }}
    />
  );
}
