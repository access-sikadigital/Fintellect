import Link from "next/link";
import { Wordmark, Logomark } from "@/components/ui/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { site, footerNav } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-dark grain relative overflow-hidden bg-forest text-offwhite">
      {/* Closing call to action */}
      <div className="container-wide relative z-10 border-b border-paper-20 py-[clamp(4rem,9vh,7rem)]">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-sand">Ready when you are</p>
            </Reveal>
            <SplitLines
              as="h2"
              className="type-display mt-5 max-w-[16ch] text-offwhite"
            >
              Tell us the problem. We&rsquo;ll tell you if we can fix it.
            </SplitLines>
          </div>

          <Reveal variant="rise" delay={0.15} className="grid gap-4">
            <p className="type-body max-w-[42ch] text-paper-60">
              Most enquiries get a call back within about {site.callbackMinutes}{" "}
              minutes during business hours. If we can&rsquo;t help, we&rsquo;ll say
              so on that first call.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="onDark" size="lg" magnetic>
                Start your assessment
              </Button>
              <a
                href={site.phoneHref}
                className="type-label px-2 py-4 text-sand transition-colors hover:text-offwhite"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Directory */}
      <div className="container-wide relative z-10 grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div className="flex flex-col gap-5">
          <Logomark className="h-10 w-auto text-sand" />
          <p className="type-body max-w-[34ch] text-[0.9375rem] text-paper-60">
            Independent mortgage and finance brokers. We work for you, not the
            bank.
          </p>
          <div className="flex flex-col gap-1 text-[0.9375rem] text-paper-60">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-offwhite"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="transition-colors hover:text-offwhite"
            >
              {site.phone}
            </a>
          </div>
        </div>

        {Object.entries(footerNav).map(([heading, links]) => (
          <nav key={heading} aria-label={heading} className="flex flex-col gap-4">
            <h3 className="type-label font-sans text-sand">{heading}</h3>
            <ul className="flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="type-body text-[0.9375rem] text-paper-60 transition-colors duration-200 hover:text-offwhite"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Oversized wordmark — the brand signature at the base of the page */}
      <div
        aria-hidden="true"
        className="container-wide relative z-10 pointer-events-none pb-8"
      >
        <Wordmark className="w-full text-paper-10" />
      </div>

      {/* Compliance */}
      <div className="relative z-10 border-t border-paper-20">
        <div className="container-wide flex flex-col gap-5 py-8">
          <p className="type-body text-[0.8125rem] leading-relaxed text-paper-40">
            {site.legalName} holds Australian Credit Licence {site.acl}. This
            website provides general information only and does not take your
            objectives, financial situation or needs into account. Consider
            whether it is appropriate for you and read the relevant disclosure
            documents before making a decision. All calculator results are
            estimates only and are not an offer of credit or a quote. Lending
            criteria, fees, charges, terms and conditions apply and are subject
            to change. Offices in {site.offices.join(" and ")}.
          </p>
          <div className="flex flex-col gap-3 text-[0.8125rem] text-paper-40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link href="/credit-guide" className="hover:text-offwhite">
                Credit guide
              </Link>
              <Link href="/privacy-policy" className="hover:text-offwhite">
                Privacy
              </Link>
              <Link href="/complaints-and-disputes" className="hover:text-offwhite">
                Complaints &amp; AFCA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
