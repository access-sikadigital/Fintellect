import { CallButton } from "@/components/ui/CallButton";
import Image from "next/image";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/page/Breadcrumbs";
import { site } from "@/data/site";

type PageHeroProps = {
  eyebrow: string;
  h1: string;
  intro: string;
  image?: string;
  alt?: string;
  trail: Crumb[];
  /** Overrides the default enquiry CTA. */
  cta?: { label: string; href: string };
};

/** Standard top of every interior page. */
export function PageHero({
  eyebrow,
  h1,
  intro,
  image,
  alt,
  trail,
  cta,
}: PageHeroProps) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-forest text-offwhite">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        <div className="absolute -top-[16rem] -right-[10rem] h-[38rem] w-[38rem] rounded-full border border-paper-10" />
      </div>

      <div className="container-wide relative z-10 pt-24 pb-12 sm:pt-28 lg:pt-36 lg:pb-16">
        <Breadcrumbs trail={trail} />

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal variant="fade">
              <p className="type-label text-sand">{eyebrow}</p>
            </Reveal>
            <SplitLines as="h1" className="type-display mt-5 max-w-[16ch] text-offwhite">
              {h1}
            </SplitLines>
            <Reveal variant="rise" delay={0.12}>
              <p className="type-subtitle mt-7 max-w-[46ch] font-normal text-paper-60">
                {intro}
              </p>
            </Reveal>
            <Reveal variant="rise" delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  href={cta?.href ?? "#enquire"}
                  variant="onDark"
                  size="lg"
                  magnetic
                >
                  {cta?.label ?? site.cta.primary}
                </Button>
                <CallButton tone="dark" />
              </div>
            </Reveal>
          </div>

          {/* Shown on every breakpoint now — the page used to be plain text
              on a phone, which is what made it feel bare. */}
          {image && (
            <Reveal variant="clip" delay={0.1}>
              <div /* 4:3 at every breakpoint — every source in this slot is 4:3, so the
                   image is shown whole rather than cropped to a wider frame. */
                className="relative aspect-[4/3] w-full overflow-hidden rounded-panel border border-paper-20">
                <Image
                  src={image}
                  alt={alt ?? ""}
                  fill
                  priority
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover object-[center_35%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
