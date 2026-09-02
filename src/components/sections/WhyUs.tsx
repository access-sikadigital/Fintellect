import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/*
 * Every competing broker site runs a version of this grid. Theirs read
 * "Tailored Advice", "Fast Approvals", "Experience That Counts" — claims any
 * of them could make, which means none of them mean anything.
 *
 * Each tile below is a fact a visitor could check, or a promise with a number
 * attached to it. Where a rival says "40+ lenders" we say why that figure is
 * theatre; where they say "trusted advice" we say what we'll refuse to do.
 */
const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "bank",
    title: "We hold our own credit licence",
    body: `ACL ${site.acl}. Most brokers operate as a credit representative under somebody else's authorisation and a restricted lender panel. We don't, which is how we reach lenders they can't.`,
  },
  {
    icon: "clock",
    title: `A call back in about ${site.callbackMinutes} minutes`,
    body: "During business hours, and we try three times before we give up on you. You will know on that first call whether we can help.",
  },
  {
    icon: "search",
    title: "We compare five, not forty",
    body: "Five is roughly how many lenders will genuinely approve any given situation. Advertising a bigger number is marketing, not work — and we'll tell you which five and why.",
  },
  {
    icon: "wallet-1",
    title: "No fee on the loans on this site",
    body: "The lender pays us a commission when the loan settles. Fees apply to private lending and some commercial deals, and you'll have the number before you commit.",
  },
  {
    icon: "user",
    title: "One person, start to finish",
    body: "The broker you speak to first is the one who structures the application and takes it to settlement. Nobody gets handed to a processing team.",
  },
  {
    icon: "thumb-up",
    title: "We'll tell you to stay put",
    body: "If your current loan is already competitive, that's the answer you get. It costs us the deal, and it's the reason nine in ten of our clients arrive by referral.",
  },
];

export function WhyUs() {
  return (
    <section
      className="on-dark grain relative overflow-hidden bg-forest-warm text-offwhite"
      aria-labelledby="why-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[16rem] -right-[12rem] h-[40rem] w-[40rem] rounded-full border border-paper-10" />
      </div>

      <div className="container-wide section-y relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-sand">Why people choose us</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="why-heading"
              className="type-display mt-4 max-w-[14ch] text-offwhite"
            >
              Six things you can check for yourself.
            </SplitLines>
          </div>
          <Reveal variant="rise" delay={0.1} className="lg:pb-2">
            <p className="type-body max-w-[36ch] text-paper-60">
              None of these are opinions. Ask us to prove any of them.
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="rise"
          stagger={0.07}
          className="mt-12 grid gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {reasons.map((r, i) => {
            /* Every third tile inverts to sand. One flag drives the card and
               everything in it, so the two can never drift apart again. */
            const light = i % 3 === 1;
            return (
              <article
                key={r.title}
                className={cn(
                  "group flex h-full flex-col rounded-panel border p-8 transition-colors duration-500",
                  light
                    ? "border-sand bg-sand"
                    : "border-paper-20 bg-paper-10 hover:border-sand/50",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                    light
                      ? "border-clay-60 text-clay"
                      : "border-paper-20 text-clay-soft group-hover:border-clay-60",
                  )}
                >
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <h3
                  className={cn(
                    "type-title mt-6 text-[clamp(1.75rem,2.2vw,2.125rem)]",
                    light ? "text-forest" : "text-offwhite",
                  )}
                >
                  {r.title}
                </h3>
                <p
                  className={cn(
                    "type-body mt-3",
                    light ? "text-forest/70" : "text-paper-60",
                  )}
                >
                  {r.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
