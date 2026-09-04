/**
 * Award and recognition badges supplied by the client.
 *
 * The source files were flat artwork on a white square; the white has been
 * cut to transparency so they sit on a surface rather than in a box.
 *
 * FLAG FOR JOHN: confirm the award year for each of these before launch, and
 * confirm Fintellect is entitled to display them currently. Award badges
 * usually carry a year and are licensed for a period — we should not imply a
 * standing that has lapsed. Add `year` below once confirmed.
 */
export type Award = {
  src: string;
  /** Short line under the badge. Mirrors what the badge itself says. */
  label: string;
  /** The awarding body, for the accessible name. */
  issuer: string;
  width: number;
  height: number;
};

export const awards: Award[] = [
  {
    src: "/brand/awards/ama-excellence-awardee.webp",
    label: "Excellence Awardee",
    issuer: "Australian Mortgage Awards — Resimac Brokerage of the Year",
    width: 260,
    height: 219,
  },
  {
    src: "/brand/awards/award-winning-broker.webp",
    label: "Award-winning broker",
    issuer: "Award-winning mortgage broker",
    width: 260,
    height: 230,
  },
  {
    src: "/brand/awards/top-25-brokerage.webp",
    label: "Top 25 Brokerage",
    issuer: "Top 25 Brokerage",
    width: 260,
    height: 218,
  },
];
