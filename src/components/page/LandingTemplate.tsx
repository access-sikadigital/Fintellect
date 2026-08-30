import Image from "next/image";
import Link from "next/link";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import { Logomark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { credentials, complianceNote } from "@/data/shared";
import { site } from "@/data/site";
import type { LandingPage } from "@/data/types";

/** Conversion-focused page for paid traffic. No navigation, one action. */
export function LandingTemplate({ page }: { page: LandingPage }) {
  return (
    <>
      {/* Minimal header — brand and phone only */}
      <header className="on-dark bg-forest">
        <div className="container-wide flex items-center justify-between gap-6 py-5">
          <Link href="/" aria-label="Fintellect" className="flex items-center gap-3">
            <Logomark className="h-8 w-auto text-offwhite" />
            <span className="type-label hidden text-paper-40 sm:inline">
              ACL {site.acl}
            </span>
          </Link>
          <a href={site.phoneHref} className="type-label text-sand transition-colors hover:text-offwhite">
            {site.phone}
          </a>
        </div>
      </header>

      <section className="on-dark grain relative overflow-hidden bg-forest text-offwhite">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <div className="container-wide relative z-10 grid gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <SplitLines as="h1" className="type-display max-w-[15ch] text-offwhite" immediate>
              {page.h1}
            </SplitLines>
            <Reveal variant="rise" delay={0.15}>
              <p className="type-subtitle mt-7 max-w-[44ch] font-normal text-paper-60">
                {page.intro}
              </p>
            </Reveal>

            <Reveal variant="rise" delay={0.22} stagger={0.06} className="mt-9 grid gap-3.5">
              {page.bullets.map((b) => (
                <div key={b} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sand text-forest">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="type-body text-paper-60">{b}</span>
                </div>
              ))}
            </Reveal>

            <Reveal variant="rise" delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="#enquire" variant="onDark" size="lg" magnetic>
                  Check if we can help
                </Button>
                <a href={site.phoneHref} className="type-label px-3 py-4 text-sand hover:text-offwhite">
                  or call {site.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="clip" delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panel">
              <Image
                src={page.heroImage}
                alt={page.heroAlt}
                fill
                priority
                sizes="(min-width:1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Credential strip */}
        <div className="relative z-10 border-t border-paper-20">
          <div className="container-wide grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.label}>
                <p className="type-label text-paper-40">{c.label}</p>
                <p className="type-body mt-1.5 text-[0.9375rem] text-offwhite">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm formType={page.formType} serviceName={page.h1} />

      <footer className="border-t border-ink-12 bg-offwhite py-10">
        <div className="container-wide flex flex-col gap-4">
          <p className="type-body max-w-[110ch] text-[0.8125rem] leading-relaxed text-ink-50">
            {complianceNote}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ink-50">
            <Link href="/credit-guide" className="hover:text-forest">Credit guide</Link>
            <Link href="/privacy-policy" className="hover:text-forest">Privacy</Link>
            <Link href="/complaints-and-disputes" className="hover:text-forest">Complaints &amp; AFCA</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
