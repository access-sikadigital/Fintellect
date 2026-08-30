import Link from "next/link";
import { site } from "@/data/site";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb plus the BreadcrumbList schema the scope requires. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ label: "Home", href: "/" }, ...trail];

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <span key={c.href} className="flex items-center gap-2">
              {last ? (
                <span className="type-label text-paper-40" aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="type-label text-sand transition-colors hover:text-offwhite"
                >
                  {c.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-paper-20">
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>

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
    </>
  );
}
