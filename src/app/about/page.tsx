import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import {
  Credentials,
  HowItWorks,
  CtaBand,
  ComplianceNote,
} from "@/components/page/ServiceSections";
import { FaqSection } from "@/components/page/FaqSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Fintellect | Independent Brokers, ACL 515382",
  description:
    "Independent mortgage and finance brokers in Melbourne and the Gold Coast, lending Australia-wide. We hold our own credit licence and work for you, not the bank.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: 217, suffix: "", label: "Loans settled last year" },
  { value: 90, suffix: "%", label: "Of referred clients settle" },
  { value: 10, prefix: "~", suffix: " min", label: "Typical callback" },
  { value: 22, suffix: " min", label: "Fastest approval" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        h1="We work for you, not the bank."
        intro="Independent brokers holding our own credit licence. Almost all of our business has come by referral, which is a standard we'd like to keep."
        image="/brand/photography/page-about.webp"
        trail={[{ label: "About", href: "/about" }]}
        cta={{ label: "Talk to us", href: "/contact" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-green">Why we exist</p>
            </Reveal>
            <SplitLines as="h2" className="type-display mt-4 max-w-[13ch] text-forest">
              Every broker says they compare forty lenders.
            </SplitLines>
          </div>
          <Reveal variant="rise" delay={0.1} className="grid gap-5">
            <p className="type-body text-ink-70">
              We generally compare about five, because five is how many will
              genuinely say yes to any given situation. Naming a bigger number
              would be marketing rather than work.
            </p>
            <p className="type-body text-ink-70">
              What matters more is that we hold our own Australian Credit
              Licence rather than sitting on a restricted aggregator panel.
              That gives us access to lenders other brokers cannot reach, and
              it is the difference on the applications that are hard.
            </p>
            <p className="type-body text-ink-70">
              The rest of it is unglamorous: answering the phone, telling
              people the truth early, and doing the chasing so nobody else has
              to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-wide">
          <p className="type-label text-green">The record</p>
          <SplitLines as="h2" className="type-display mt-4 max-w-[12ch] text-forest">
            Twelve months, by the numbers.
          </SplitLines>
          <Reveal
            variant="rise"
            stagger={0.08}
            className="mt-12 grid gap-px overflow-hidden rounded-panel border border-ink-12 bg-ink-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 bg-sand p-8">
                <p className="type-title text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-green">
                  <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
                </p>
                <p className="type-label text-forest">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <p className="type-body mt-6 max-w-[78ch] text-[0.8125rem] text-forest/50">
            Fintellect&rsquo;s own records for the twelve months to August 2026.
            Not a guarantee of any particular outcome.
          </p>
        </div>
      </section>

      {/*
        Photography of Robert, the team and both offices does not exist —
        scope §12. This is the largest remaining gap for a business whose
        differentiator is being personal. No stock stand-in is used here.
      */}
      <HowItWorks />
      <Credentials proofNote="Team photography and case studies are being captured and will appear here." />

      <FaqSection
        eyebrow="FAQ"
        heading="About Fintellect"
        faqs={[
          {
            q: "Are you independent?",
            a: `Yes. ${site.legalName} holds its own Australian Credit Licence (${site.acl}) rather than operating under someone else's authorisation. No lender owns any part of the business.`,
          },
          {
            q: "Where are you based?",
            a: `We have offices in ${site.offices.join(" and ")} and are licensed to arrange credit anywhere in Australia. Most clients never visit an office.`,
          },
          {
            q: "What does it cost to use you?",
            a: "Nothing on the home loans described on this site — the lender pays us a commission on settlement. Fees apply to private lending and some commercial transactions, and you'll know the number before committing.",
          },
        ]}
      />

      <CtaBand
        heading="Tell us the situation."
        body="A call back in about ten minutes during business hours, and a straight answer either way."
        cta={{ label: "Get in touch", href: "/contact" }}
      />
      <ComplianceNote />
    </>
  );
}
