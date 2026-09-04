import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { CtaBand, ComplianceNote, Credentials } from "@/components/page/ServiceSections";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Reviews | Fintellect Mortgage Brokers",
  description:
    "What clients say about working with Fintellect. Independent mortgage and finance brokers, ACL 515382.",
  alternates: { canonical: "/reviews" },
};

/*
 * Reviews and case studies are the largest content gap in the project —
 * scope §9. The five-deal section and the testimonials section of the
 * discovery form were both left blank.
 *
 * Nothing is invented here. The page is built and ready to populate from the
 * Google Business Profile feed and the captured deal stories. Publishing
 * fabricated testimonials under ACL 515382 is not an option.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        h1="Almost everyone here arrived by referral."
        intro="Ninety per cent of clients who come to us through someone they trust go on to settle. We're collecting those stories properly rather than paraphrasing them."
        image="/brand/photography/page-reviews.webp"
        trail={[{ label: "Reviews", href: "/reviews" }]}
        cta={{ label: "Talk to us", href: "/contact" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide">
          <SplitLines as="h2" className="type-display max-w-[13ch] text-forest">
            Being worth referring is the whole business model.
          </SplitLines>
          <Reveal variant="rise" delay={0.1} className="mt-8 grid gap-5 lg:max-w-[62ch]">
            <p className="type-body text-ink-70">
              A referral arrives already trusting you, which is why nine in ten
              of them settle. It also means the fastest way to lose the
              business is to give somebody advice that suits us rather than
              them.
            </p>
            <p className="type-body text-ink-70">
              Verified reviews from our Google Business Profile and written
              case studies with real figures are being collected now and will
              be published here as they are confirmed.
            </p>
          </Reveal>

          <Reveal
            variant="rise"
            delay={0.16}
            className="mt-12 flex items-start gap-5 rounded-panel border border-dashed border-ink-30 p-8"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-30 text-green">
              <Icon name="star" className="h-5 w-5" />
            </span>
            <div>
              <p className="type-title text-[1.375rem] text-forest">
                Reviews are being verified before publication
              </p>
              <p className="type-body mt-2 max-w-[54ch] text-[0.9375rem] text-ink-70">
                We&rsquo;d rather show you nothing than show you something we
                wrote ourselves. In the meantime, ask us for references — we
                will give you real ones.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Credentials proofNote="Verified reviews and case studies will be published here as they are confirmed." />
      <CtaBand
        heading="Ask us for a reference."
        body="We'll put you in touch with someone we've actually settled a loan for."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
      <ComplianceNote />
    </>
  );
}
