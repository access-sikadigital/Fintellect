import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { awards } from "@/data/awards";

/**
 * Recognition band at the top of the footer.
 *
 * Deliberately a LIGHT band inside the dark footer. The badges are navy and
 * near-black artwork — between 16% and 32% of each one is ink darker than the
 * forest ground, so on the dark footer the lettering would simply disappear.
 * A cream band keeps them legible and doubles as a break in a long dark block.
 */
export function AwardsStrip() {
  if (awards.length === 0) return null;

  return (
    <section
      aria-labelledby="recognition-heading"
      className="relative z-10 bg-offwhite text-forest"
    >
      <div className="container-wide py-12 sm:py-14">
        <Reveal variant="fade">
          <p
            id="recognition-heading"
            className="type-label text-center text-green"
          >
            Recognition
          </p>
        </Reveal>

        <ul className="mt-8 grid grid-cols-3 items-end gap-x-4 gap-y-8 sm:gap-x-10 lg:mx-auto lg:max-w-4xl lg:gap-x-16">
          {awards.map((a, i) => (
            <Reveal
              key={a.src}
              as="li"
              variant="rise"
              delay={0.06 * i}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <Image
                src={a.src}
                alt={a.issuer}
                width={a.width}
                height={a.height}
                /* Already hand-cut and compressed at 2x. Left unoptimized so
                   the alpha survives: the optimizer's JPEG fallback would
                   flatten the transparency back into a solid box. */
                unoptimized
                className="h-16 w-auto object-contain transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-1 sm:h-20 lg:h-24"
              />
              <span className="type-label text-[0.6875rem] text-forest/60 sm:text-[0.75rem]">
                {a.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
