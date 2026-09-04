/**
 * Where the subject sits in each hero photograph.
 *
 * Every entry is a CSS `object-position`. `mobile` applies below 1024px,
 * `desktop` from 1024px up — the two breakpoints `HeroBackdrop` has.
 *
 * These are not guesses. Every page was rendered at four device widths and
 * the hero band measured, which gives how much of a 3:2 source survives
 * `object-cover`:
 *
 *   phone   390px, band ~680px tall  →  38% of the width
 *   tablet  768px, band ~568px tall  →  90%
 *   iPad   1024px, band ~673px tall  →  71%
 *   desktop 1440px, band ~780px tall →  86%
 *
 * So the phone is the only severe crop, and it is severe: a two-person
 * composition cannot fit in 38%. Where the whole subject does not fit, the
 * value frames the primary face or object cleanly rather than slicing two —
 * half a face reads as a bug, a tight crop does not. Tablet and iPad are
 * gentle enough that the same `mobile` value serves them without harm.
 *
 * Add an entry whenever a new hero photograph lands; without one it falls
 * back to `DEFAULT_FOCUS`, which is safe but not tuned.
 */
export type Focus = { mobile: string; desktop: string };

/** Middle-ish. Fine for objects and machinery, a guess for anything with a face. */
export const DEFAULT_FOCUS: Focus = { mobile: "50% 40%", desktop: "55% 38%" };

const FOCUS: Record<string, Focus> = {
  /* Six faces spread right across a 4:3 frame at roughly 12, 24, 37, 57, 73
     and 88 per cent. The homepage hero is full height, so it crops on the
     horizontal axis: desktop keeps about 70% of the width and holds four of
     them, while the phone keeps only 29% — room for two. Mobile therefore
     centres on the middle pair rather than slicing the row. */
  "/brand/photography/home-hero.webp": { mobile: "46% 30%", desktop: "50% 30%" },

  /* A couple, faces spanning 24–72%. The phone crop leaves a window barely
     wider than that pair, so this is close to the only value that keeps both
     of them whole. */
  "/brand/photography/hub-home-loans.webp": { mobile: "65% 30%", desktop: "50% 25%" },
  /* One owner standing dead centre of a warehouse aisle. Desktop barely crops
     him at all and lands him at about 63–74% across the band, clear of the
     headline; mobile has to pan right to reach him. */
  "/brand/photography/hub-commercial.webp": { mobile: "58% 28%", desktop: "52% 26%" },
  /* Three trucks across a 2:1 frame. The phone crop shows roughly a third of
     the width, so this centres on the middle truck rather than splitting two. */
  "/brand/photography/hub-asset.webp": { mobile: "46% 60%", desktop: "50% 55%" },

  /* City pages. All three are aerials with no faces, so these only decide how
     much sky is kept — the skyline and the rooflines sit below the midline. */
  "/brand/photography/loc-brisbane.webp": { mobile: "50% 55%", desktop: "50% 50%" },
  "/brand/photography/loc-melbourne.webp": { mobile: "50% 65%", desktop: "50% 60%" },
  "/brand/photography/loc-gold-coast.webp": { mobile: "50% 50%", desktop: "50% 50%" },

  /* Couple on the couch with the paperwork, seated centre-right. */
  "/brand/photography/svc-smsf.webp": { mobile: "60% 35%", desktop: "52% 35%" },

  /* Couple with the paperwork, faces at 30–68% and high in the frame. */
  "/brand/photography/svc-refinance.webp": { mobile: "48% 28%", desktop: "50% 25%" },
  /* He sits in the van doorway, low and left of centre. */
  "/brand/photography/svc-self-employed.webp": { mobile: "43% 40%", desktop: "45% 40%" },
  /* A 1.9:1 source, so this crops horizontally on desktop too. Both values
     land him right of the headline rather than behind it. */
  "/brand/photography/svc-doctors.webp": { mobile: "46% 30%", desktop: "40% 30%" },
  /* He sits well right of centre with the laptop to his left — the phone crop
     has to pan a long way over to reach him. */
  "/brand/photography/svc-professionals.webp": { mobile: "72% 32%", desktop: "60% 30%" },
  /* The "For Lease" sign is the whole story and it sits at 63–85%, so the
     phone crop hugs the right rather than centring on the fence. */
  "/brand/photography/svc-investment.webp": { mobile: "89% 45%", desktop: "60% 45%" },
  /* The florist sits left of centre at 22–52%, so the phone crop pans left —
     the opposite of most of these. */
  "/brand/photography/svc-lowdoc.webp": { mobile: "29% 28%", desktop: "45% 30%" },
  /* He stands well right in the warehouse aisle at 62–78%. */
  "/brand/photography/svc-business.webp": { mobile: "82% 40%", desktop: "60% 40%" },
  /* Sydney rooftops. No faces, so this just favours the buildings over the
     sky, which fills the top third. */
  "/brand/photography/svc-commercial-property.webp": { mobile: "62% 55%", desktop: "50% 50%" },

  /* Framing, no people — any crop reads. */
  "/brand/photography/svc-construction.webp": { mobile: "54% 45%", desktop: "50% 45%" },
  /* "FOR SALE" board at 63–88%, same reasoning as the For Lease shot. */
  "/brand/photography/svc-bridging.webp": { mobile: "91% 50%", desktop: "58% 45%" },
  /* Cropped to the receipts and the calculator, which sit centre-low. */
  "/brand/photography/svc-debt.webp": { mobile: "52% 55%", desktop: "50% 50%" },
  /* Mechanic at 52–72%, with the van filling the left of the frame. */
  "/brand/photography/svc-working-capital.webp": { mobile: "69% 45%", desktop: "58% 45%" },
  /* Grader at 33–100% with a truck behind it on the left; the phone crop
     follows the machine, not the truck. */
  "/brand/photography/svc-equipment.webp": { mobile: "70% 45%", desktop: "55% 45%" },
  /* The cab is the subject and sits at 5–55%, so this pans left — far enough
     to hold the cab, not so far that it disappears under the dark wash. */
  "/brand/photography/svc-truck.webp": { mobile: "40% 50%", desktop: "50% 38%" },
  /* Excavator body at 55–90% with sky filling the top 40%. */
  "/brand/photography/svc-machinery.webp": { mobile: "86% 55%", desktop: "55% 55%" },
  /* He sits on the ute tray at 28–58%, face high in the frame. */
  "/brand/photography/svc-chattel.webp": { mobile: "39% 32%", desktop: "48% 32%" },
  /* Hands and the key, dead centre — no panning needed. */
  "/brand/photography/svc-vehicle.webp": { mobile: "52% 50%", desktop: "50% 50%" },

  /* The /lp/ pages. Their hero is taller than a service page's, so the
     desktop crop moves to the horizontal axis and the phone window narrows to
     roughly a third of the width — tighter than anywhere else on the site. */

  /* Both faces span 12–55%, wider than the phone window, so this holds the
     man whole and lets the woman run off the left edge. */
  "/brand/photography/lp-refinance.webp": { mobile: "36% 30%", desktop: "20% 30%" },
  /* A square source: the only one here that crops vertically on desktop, and
     his head sits near the top. */
  "/brand/photography/lp-self-employed.webp": { mobile: "50% 20%", desktop: "50% 12%" },
  /* He stands at 47–83%, which just fits the phone window. */
  "/brand/photography/lp-doctors.webp": { mobile: "74% 30%", desktop: "50% 30%" },
  /* The excavator is wider than the phone window, so this centres on the cab
     rather than trying to hold the whole machine. */
  "/brand/photography/lp-equipment.webp": { mobile: "59% 60%", desktop: "50% 55%" },
  /* Portrait at 30–62%, nudged right on desktop to clear the headline. */
  "/brand/photography/lp-commercial.webp": { mobile: "44% 28%", desktop: "15% 28%" },

  /* The remaining site pages. */

  /* The adviser sits right at 60–88% with the clients in the foreground; the
     phone crop follows her rather than the backs of their heads. */
  "/brand/photography/page-about.webp": { mobile: "89% 25%", desktop: "55% 25%" },
  /* Headset and hand, no full face — nothing to protect, just centre it. */
  "/brand/photography/page-contact.webp": { mobile: "70% 45%", desktop: "55% 45%" },
  /* Three people spread too wide for the phone window, so this holds the
     woman facing camera whole and stops short of the man rather than slicing
     his face down the middle. */
  "/brand/photography/page-reviews.webp": { mobile: "40% 30%", desktop: "50% 30%" },
  /* He reads at 28–62%, face high. */
  "/brand/photography/page-guides.webp": { mobile: "42% 30%", desktop: "50% 30%" },
  /* Desk objects across the lower half of a 1.9:1 frame. */
  "/brand/photography/page-calculators.webp": { mobile: "61% 60%", desktop: "50% 55%" },

  /* The last two city pages. Both are near-vertical aerials with no horizon,
     so these mostly just avoid landing on a blank patch of road. */
  "/brand/photography/loc-sydney.webp": { mobile: "50% 50%", desktop: "50% 50%" },
  "/brand/photography/loc-perth.webp": { mobile: "50% 50%", desktop: "50% 50%" },

  /* Guide articles. */
  "/brand/photography/guide-when-to-refinance.webp": { mobile: "48% 28%", desktop: "50% 26%" },
  /* Overhead invoices and a calculator — no faces, keep the paperwork. */
  "/brand/photography/guide-low-doc-home-loans.webp": { mobile: "50% 45%", desktop: "50% 45%" },
  /* The lawyer sits centre-right at 40–70%, with the scales and gavel left. */
  "/brand/photography/guide-lmi-waivers.webp": { mobile: "58% 30%", desktop: "52% 30%" },
  /* Two people either side of the frame; this holds the pair rather than one. */
  "/brand/photography/guide-broker-fees.webp": { mobile: "70% 30%", desktop: "50% 30%" },
  "/brand/photography/guide-low-doc-business.webp": { mobile: "66% 50%", desktop: "50% 50%" },
  /* Keys and hands across the middle. */
  "/brand/photography/guide-chattel-vs-lease.webp": { mobile: "56% 45%", desktop: "50% 45%" },

  /* Calculators and legal — objects and desks, so these only keep the crop
     off the empty half of the frame. */
  "/brand/photography/calc-stamp-duty.webp": { mobile: "37% 55%", desktop: "50% 50%" },
  "/brand/photography/calc-repayments.webp": { mobile: "65% 55%", desktop: "50% 50%" },
  "/brand/photography/calc-borrowing-capacity.webp": { mobile: "57% 55%", desktop: "50% 50%" },
  "/brand/photography/calc-lmi.webp": { mobile: "62% 45%", desktop: "55% 45%" },
  "/brand/photography/calc-refinance-savings.webp": { mobile: "55% 55%", desktop: "50% 50%" },
  "/brand/photography/legal-compliance.webp": { mobile: "57% 50%", desktop: "50% 50%" },
};

export function focusFor(src: string): Focus {
  return FOCUS[src] ?? DEFAULT_FOCUS;
}
