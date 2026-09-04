import { CallButton } from "@/components/ui/CallButton";
import { ActionPair } from "@/components/ui/ActionPair";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/page/Breadcrumbs";
import { HeroBackdrop } from "@/components/page/HeroBackdrop";
import { site } from "@/data/site";

type PageHeroProps = {
  eyebrow: string;
  h1: string;
  intro: string;
  /** Bled behind the band as a decorative backdrop, not a framed panel. */
  image?: string;
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
  trail,
  cta,
}: PageHeroProps) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-forest text-offwhite">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
        {image && <HeroBackdrop src={image} />}
        <div className="absolute -top-[16rem] -right-[10rem] h-[38rem] w-[38rem] rounded-full border border-paper-10" />
      </div>

      <div className="container-wide relative z-10 pt-24 pb-16 sm:pt-28 lg:pt-36 lg:pb-24">
        <Breadcrumbs trail={trail} />

        {/* The photograph is the ground now, so the words get a single
            column and stop short of the right edge where it reads through. */}
        <div className="mt-8 max-w-[38rem] lg:mt-10 lg:max-w-[44rem]">
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
            <ActionPair className="mt-9">
              <Button
                href={cta?.href ?? "#enquire"}
                variant="onDark"
                size="lg"
                magnetic
                className="w-full"
              >
                {cta?.label ?? site.cta.primary}
              </Button>
              <CallButton tone="dark" size="lg" />
            </ActionPair>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
