import Image from "next/image";
import type { CSSProperties } from "react";
import { focusFor } from "@/data/imageFocus";
import { cn } from "@/lib/utils";

/**
 * The photograph behind a hero.
 *
 * Every hero used to sit its image in a bordered panel on the right, which
 * read as a card pasted onto the band rather than part of it.
 *
 * The photograph now occupies the right 70% of the band from `lg` up, and the
 * whole band below it. The part that makes it read as one surface is the
 * wash: it is a single gradient across the *entire section*, not an overlay
 * boxed to the image. It holds solid forest across the left third — past the
 * point where the photograph begins — then steps lighter, and lighter again,
 * towards the right edge. Because the photograph's own left edge falls inside
 * the solid part of that gradient, there is nothing to see there: no seam, no
 * sense of the image starting.
 *
 * Renders no ground of its own — the calling section keeps its
 * `--gradient-dark` base, which covers an imageless hero.
 *
 * Decorative: the words carry the meaning, so the image is hidden from
 * assistive technology and its alt is empty. The caller supplies the
 * `aria-hidden` wrapper.
 */
export function HeroBackdrop({
  src,
  priority = true,
  parallax = false,
}: {
  src: string;
  priority?: boolean;
  /** Homepage only — tags the photograph for the GSAP drift and overscans it. */
  parallax?: boolean;
}) {
  /*
    Where the faces are in this particular photograph. The crop is severe
    enough — about half the width on a phone — that a single shared position
    cuts someone out of most of these shots.
  */
  const focus = focusFor(src);

  return (
    <>
      <div
        {...(parallax ? { "data-hero": "media" } : {})}
        className={cn(
          "absolute right-0 w-full lg:w-[70%]",
          /* Overscanned when it drifts, so the parallax never pulls the top
             or bottom edge of the photograph into the band. */
          parallax ? "-top-[10%] -bottom-[10%]" : "inset-y-0",
        )}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 70vw, 100vw"
          style={
            {
              "--focus": focus.mobile,
              "--focus-lg": focus.desktop,
            } as CSSProperties
          }
          className="object-cover [object-position:var(--focus)] lg:[object-position:var(--focus-lg)]"
        />
      </div>

      {/*
        One wash, full width of the section. Solid to 34% — comfortably past
        the photograph's left edge at 30% — then lighter, then lighter again.
        Heavier throughout below `lg`, where the words sit over the picture
        rather than beside it.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/65 lg:from-34% lg:via-forest/55 lg:via-62% lg:to-forest/10" />

      {/* Vertical settle, so the band meets what follows without a seam. */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/85" />
    </>
  );
}
