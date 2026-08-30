import { Marquee } from "@/components/motion/Marquee";
import { Logomark } from "@/components/ui/Logo";

const claims = [
  "Independent, not owned by a bank",
  "Australian Credit Licence 515382",
  "We compare, negotiate and lodge",
  "One point of contact, start to finish",
  "No fee on the loans we advertise here",
  "Melbourne & Gold Coast",
];

/** A quiet band of credentials between the hero and the first real section. */
export function Ticker() {
  return (
    <section
      aria-label="What sets Fintellect apart"
      className="border-y border-ink-12 bg-sand py-5"
    >
      <Marquee speed={52} fade>
        {claims.map((claim) => (
          <span key={claim} className="flex items-center">
            <span className="type-label px-8 whitespace-nowrap text-forest/70">
              {claim}
            </span>
            <Logomark aria-hidden="true" className="h-3.5 w-auto text-green/50" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
