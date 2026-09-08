import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { EnquiryForm } from "@/components/page/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Fintellect Mortgage Brokers",
  description:
    "Call, email or send an enquiry. Most enquiries get a call back within about ten minutes during business hours. Offices in Melbourne and the Gold Coast.",
  alternates: { canonical: "/contact" },
};

/*
 * Both office cards previously printed one sentence word for word, which reads
 * as a template error rather than as information.
 */
const OFFICE_NOTE: Record<string, string> = {
  Melbourne:
    "Our main office. You're welcome to come in, though most clients never do \u2014 identification is verified electronically and documents are signed online.",
  "Gold Coast":
    "Serving south-east Queensland and northern New South Wales. Meetings by appointment; everything else is handled by phone and online.",
  default:
    "You're welcome to come in, though most clients never do \u2014 identification is verified electronically and documents are signed online.",
};

export default function Page() {
  return (
    <>
      <PageHero
        showCall
        eyebrow="Contact"
        h1="Let’s find you a way forward."
        intro="A call back in about ten minutes during business hours. If we can’t help, we’ll say so on that first call."
        image="/brand/photography/page-contact.webp"
        trail={[{ label: "Contact", href: "/contact" }]}
        cta={{ label: "Start the form", href: "#enquire" }}
      />

      <section className="section-y bg-offwhite">
        <div className="container-wide">
          <SplitLines as="h2" className="type-display max-w-none sm:max-w-[12ch] text-forest">
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
                className="group card-on-light flex h-full flex-col justify-between gap-8 rounded-panel border p-8 transition-colors duration-500 hover:border-clay"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-offwhite text-offwhite">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="type-label text-sand">{c.label}</p>
                  {/*
                    Inter, not Fraunces. A phone number and an email address
                    are the two things on this page a visitor has to read
                    character by character, and the display serif is the wrong
                    tool for that at this size.
                  */}
                  <p className="type-subtitle mt-2.5 text-[1.0625rem] transition-colors duration-300 group-hover:text-clay-soft">
                    {c.value}
                  </p>
                  <p className="type-body card-muted mt-2 text-[0.875rem]">{c.note}</p>
                </div>
              </a>
            ))}
          </Reveal>

          <Reveal variant="rise" delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
            {site.offices.map((city) => (
              <div
                key={city}
                className="card-on-light rounded-panel border p-8"
              >
                <p className="type-label text-sand">{city} office</p>
                <p className="type-body card-muted mt-3">
                  {OFFICE_NOTE[city] ?? OFFICE_NOTE.default}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <EnquiryForm formType="residential" serviceName="General enquiry" heading="What do you need?" />
    </>
  );
}
