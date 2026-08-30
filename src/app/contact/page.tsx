import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { ComplianceNote } from "@/components/page/ServiceSections";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Fintellect Mortgage Brokers",
  description:
    "Call, email or send an enquiry. Most enquiries get a call back within about ten minutes during business hours. Offices in Melbourne and the Gold Coast.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        h1="Tell us the problem."
        intro="A call back in about ten minutes during business hours. If we can't help, we'll say so on that first call."
        trail={[{ label: "Contact", href: "/contact" }]}
        cta={{ label: "Start the form", href: "#enquire" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide">
          <SplitLines as="h2" className="type-display max-w-[12ch] text-forest">
            Three ways to reach us.
          </SplitLines>

          <Reveal variant="rise" stagger={0.08} className="mt-12 grid gap-4 sm:grid-cols-3 sm:auto-rows-fr">
            {[
              { icon: "phone" as const, label: "Call", value: site.phone, href: site.phoneHref, note: "Fastest. We try three times." },
              { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Answered same business day." },
              { icon: "note-01" as const, label: "Enquiry form", value: "Four short steps", href: "#enquire", note: "We ask what you need before who you are." },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex h-full flex-col justify-between gap-8 rounded-panel border border-ink-12 p-8 transition-colors duration-500 hover:border-green"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ink-12 text-green">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="type-label text-green">{c.label}</p>
                  <p className="type-title mt-2.5 text-[1.15rem] text-forest">{c.value}</p>
                  <p className="type-body mt-2 text-[0.875rem] text-ink-50">{c.note}</p>
                </div>
              </a>
            ))}
          </Reveal>

          <Reveal variant="rise" delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
            {site.offices.map((city) => (
              <div key={city} className="rounded-panel border border-ink-12 p-8">
                <p className="type-label text-green">{city} office</p>
                <p className="type-body mt-3 text-ink-70">
                  You&rsquo;re welcome to come in, and almost nobody does —
                  identification is verified electronically and documents are
                  signed online.
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <EnquiryForm formType="residential" serviceName="General enquiry" heading="What do you need?" />
      <ComplianceNote />
    </>
  );
}
