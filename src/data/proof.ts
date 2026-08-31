/* ==========================================================================
 * PROOF DATA — FIN-08, FIN-09, FIN-10
 * ==========================================================================
 *
 * The three things the change brief identifies as the gap between this site
 * and Axton's: lender logos, real reviews, real people.
 *
 * All three arrays are EMPTY ON PURPOSE. Their sections detect an empty array
 * and do not render, so the live site never shows a hollow band — but the
 * moment real assets arrive, filling one array in here is the entire job.
 *
 * Nothing below is invented. Fabricated testimonials or unapproved bank logos
 * on a site operating under ACL 515382 are not a shortcut worth taking.
 * ========================================================================== */

/** FIN-08 — awaiting the approved lender list and logo files from the client. */
export type Lender = { name: string; logo: string };
export const lenders: Lender[] = [
  // { name: "Commonwealth Bank", logo: "/brand/lenders/cba.svg" },
  // Drop SVG or WebP files into /public/brand/lenders/ and list them here.
];

/** FIN-09 — awaiting real Google reviews with names. Do not write these. */
export type Review = {
  quote: string;
  name: string;
  detail?: string;
  source?: "Google" | "Direct";
};
export const reviews: Review[] = [
  // {
  //   quote: "…",
  //   name: "…",
  //   detail: "Refinance, Melbourne",
  //   source: "Google",
  // },
];

/** Overall rating — leave null until the Google Business Profile is claimed. */
export const rating: { score: number; count: number } | null = null;

/** FIN-10 — awaiting real broker photography and names. */
export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};
export const team: TeamMember[] = [
  // {
  //   name: "Robert Makhlouta",
  //   role: "Director & Credit Adviser",
  //   photo: "/brand/team/robert.webp",
  //   bio: "…",
  // },
];

/** FIN-11 — accreditations. Confirm with John which Fintellect actually holds. */
export type Accreditation = { label: string; detail: string };
export const accreditations: Accreditation[] = [
  // { label: "MFAA", detail: "Member" },
  // { label: "FBAA", detail: "Member" },
];
