import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/ui/Logo";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/*
 * Branded 404. While the remaining pages in the sitemap are still being built,
 * this is where most navigation lands — so it routes people onward rather than
 * dead-ending them.
 */
export default function NotFound() {
  return (
    <section className="on-dark grain relative flex min-h-[100svh] items-center overflow-hidden bg-forest text-offwhite">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <Logomark className="absolute -right-[10%] top-1/2 h-[80vh] w-auto -translate-y-1/2 text-green/15" />
      </div>

      <div className="container-wide py-32">
        <p className="type-label text-sand">Error 404</p>
        <h1 className="type-display mt-6 max-w-[16ch] text-offwhite">
          That page isn&rsquo;t here.
        </h1>
        <p className="type-body mt-7 max-w-[52ch] text-paper-60">
          It may have moved, or it may be one of the pages we haven&rsquo;t
          published yet. Either way, the quickest route to an answer is a
          conversation.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/" variant="onDark" size="lg" magnetic>
            Back to home
          </Button>
          <a
            href={site.phoneHref}
            className="type-label px-3 py-4 text-sand transition-colors hover:text-offwhite"
          >
            {site.phone}
          </a>
        </div>

        <div className="mt-14 border-t border-paper-20 pt-8">
          <p className="type-label text-paper-40">Popular</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { label: "Refinance", href: "/home-loans/refinance" },
              { label: "Self-employed", href: "/home-loans/self-employed" },
              { label: "Doctors & professionals", href: "/home-loans/doctors-medical-professionals" },
              { label: "Calculators", href: "/calculators" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="type-body text-paper-60 underline decoration-paper-20 underline-offset-4 transition-colors hover:text-offwhite"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
