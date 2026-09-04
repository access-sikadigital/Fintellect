/**
 * Turns supplied stock photography into the site's image set.
 *
 *   node scripts/build-images.mjs
 *
 * Envato downloads arrive as very large 3:2 JPEGs with generated filenames.
 * The site needs specific names, specific aspect ratios, and WebP. This does
 * the conversion in one place so the crop chosen for each image is recorded
 * rather than being a one-off command someone ran once.
 *
 * `crop` is [left, top, width, height] in SOURCE pixels, applied before the
 * resize. It exists because the Situations tiles are 4:5 portrait and every
 * source is 3:2 landscape — the crop is what decides who stays in frame, so
 * it is chosen per image by looking at the photograph, never centred blindly.
 * `crop: null` keeps the whole frame.
 *
 * Add the next batch to JOBS as folders arrive; keep the finished ones, so
 * the set can always be rebuilt from the originals.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SUPPLIED = "C:/Users/acer/Dropbox/My PC (LAPTOP-6IGP16DC)/Downloads/Fintelet image";
const OUT = "public/brand/photography";

const JOBS = [
  // ── Home page ──────────────────────────────────────────────────────────
  {
    out: "home-hero.webp",
    from: "Home page/happy-family-together-on-the-porch-of-house-2026-01-05-06-08-46-utc.jpg",
    // Whole frame. The family sits at 38–62% across, which is compact enough
    // to survive the hero's mobile crop; the focal point does the rest.
    crop: null,
    size: [2400, 1600],
  },
  {
    out: "sit-refinance.webp",
    from: "Home page/concerned-couple-reviewing-documents-at-kitchen-ta-2026-03-26-04-01-28-utc.jpg",
    // 4:5 slab centred on the pair (18–72% of the frame), keeping the
    // paperwork on the table that makes the tile read.
    crop: [1320, 0, 3840, 4800],
    size: [1200, 1500],
  },
  {
    out: "sit-self-employed.webp",
    from: "Home page/smiling-man-in-work-clothes-in-messy-workshop-2026-03-26-05-10-39-utc.jpg",
    // Keeps him plus enough of the tool wall to place him in his own workshop.
    crop: [1434, 0, 3584, 4480],
    size: [1200, 1500],
  },
  {
    out: "sit-professionals.webp",
    from: "Home page/smiling-doctor-with-arms-crossed-in-hospital-hallw-2026-03-09-02-55-36-utc.jpg",
    crop: [1746, 0, 4371, 5464],
    size: [1200, 1500],
  },
  {
    out: "sit-asset.webp",
    from: "Home page/construction-worker-poses-in-front-of-excavator-2026-03-24-05-23-39-utc.jpg",
    // Biased left of the subject so the excavator arm stays behind him — the
    // machine is the point of the tile, not the portrait.
    crop: [1717, 0, 3219, 4024],
    size: [1200, 1500],
  },
  {
    out: "coverage.webp",
    from: "Home page/rich-neighborhood-with-expensive-residential-homes-2026-03-16-05-10-53-utc.jpg",
    // Shown uncropped on the page, so this is just 3:2 trimmed to 4:3.
    crop: [292, 0, 4687, 3515],
    size: [1600, 1200],
  },

  // ── Section hubs ───────────────────────────────────────────────────────
  // All three are hero backdrops, which are object-cover — the aspect ratio
  // is the hero's, not the file's, so these keep their source proportions
  // (height `null`) and let the focal point decide what survives the crop.
  {
    out: "hub-home-loans.webp", // /home-loans
    from: "Section hubs/smiling-couple-holding-keys-in-new-home-2026-01-09-11-24-44-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "hub-commercial.webp", // /commercial-finance
    from: "Section hubs/smiling-man-stands-confidently-in-large-warehouse-2026-03-25-05-26-23-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "hub-asset.webp", // /asset-finance
    from: "Section hubs/trucks-waiting-for-loading-in-warehouse-2026-01-08-06-44-56-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Home loan services ─────────────────────────────────────────────────
  // Hero backdrops again, so proportions are kept and the focal point does
  // the work. Note svc-refinance, svc-self-employed and svc-doctors are each
  // shared with their /lp/ landing page until that batch lands.
  {
    out: "svc-refinance.webp", // /home-loans/refinance  (+ /lp/refinance)
    from: "Home loan services/smiling-couple-reviewing-documents-together-in-kit-2026-01-06-09-57-36-utc.JPG",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-self-employed.webp", // /home-loans/self-employed  (+ /lp/self-employed-home-loans)
    from: "Home loan services/delivery-driver-with-tablet-sits-by-van-2026-01-09-08-16-34-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-doctors.webp", // /home-loans/doctors-medical-professionals  (+ /lp/doctors-home-loans)
    from: "Home loan services/smiling-doctor-with-stethoscope-stands-in-hospital-2026-03-25-03-21-13-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-professionals.webp", // /home-loans/accountants-lawyers
    from: "Home loan services/confident-businessman-smiling-at-desk-in-modern-of-2026-01-09-07-31-54-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-investment.webp", // /home-loans/investment-property
    from: "Home loan services/white-picket-fence-with-for-lease-sign-2026-03-17-00-14-28-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-construction.webp", // /home-loans/construction
    from: "Home loan services/new-house-construction-with-wood-framing-against-b-2026-03-26-11-44-01-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-bridging.webp", // /home-loans/bridging-finance
    from: "Home loan services/home-for-sale-sign-outside-a-house-2026-03-17-08-58-46-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-debt.webp", // /home-loans/debt-consolidation
    from: "Home loan services/woman-works-on-laptop-with-calculator-and-receipts-2026-03-19-10-42-59-utc.jpg",
    // The source frames her with the top of her head already cut off by the
    // edge. Left alone that reads as a botched crop on our side, so the top
    // 15% goes and the shot becomes what it is really about: the receipts,
    // the calculator and the hands.
    crop: [0, 568, 5683, 3221],
    size: [2400, null],
  },

  // ── Commercial finance ─────────────────────────────────────────────────
  {
    out: "svc-lowdoc.webp", // /commercial-finance/low-doc-business-loans
    from: "Commercial finance/woman-owner-sitting-in-her-flower-shop-2026-03-20-00-13-48-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-business.webp", // /commercial-finance/business-loans
    from: "Commercial finance/confident-male-worker-standing-in-a-large-industri-2026-08-14-15-03-36-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-commercial-property.webp", // /commercial-finance/commercial-property-loans
    from: "Commercial finance/sydney-skyscrapers-against-blue-sky-australia-2026-03-26-07-28-03-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-working-capital.webp", // /commercial-finance/working-capital-cashflow
    from: "Commercial finance/young-male-mechanic-using-laptop-near-a-white-van-2026-07-01-21-48-46-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Asset finance ──────────────────────────────────────────────────────
  {
    out: "svc-equipment.webp", // /asset-finance/equipment-finance
    from: "Asset finance/yellow-bulldozer-leveling-construction-site-in-urb-2026-01-05-01-12-55-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-truck.webp", // /asset-finance/truck-finance
    from: "Asset finance/truck-carrying-blue-barrels-on-a-desert-highway-2026-03-18-12-17-57-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-machinery.webp", // /asset-finance/machinery-excavator
    from: "Asset finance/yellow-excavator-construction-vehicle-at-industria-2026-03-19-08-18-36-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-chattel.webp", // /asset-finance/chattel-mortgage
    from: "Asset finance/smiling-mechanic-sitting-on-pickup-truck-s-bed-2026-01-08-23-27-37-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "svc-vehicle.webp", // /asset-finance/vehicle-finance
    from: "Asset finance/passing-the-car-key-in-dealership-showroom-2026-03-19-10-41-46-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── SMSF ───────────────────────────────────────────────────────────────
  {
    out: "svc-smsf.webp", // /smsf-loans
    from: "SMSF/mature-couple-reviewing-finances-together-on-couch-2026-03-10-03-21-29-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Location pages ─────────────────────────────────────────────────────
  // Only the cities with a photograph that is actually of that place. Sydney
  // and Perth are deliberately absent — see the note in the sourcing brief.
  {
    out: "loc-brisbane.webp", // /mortgage-broker-brisbane
    from: "Location pages/brisbane-australia-march-24-2018-areal-image-o-2026-03-16-00-33-19-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "loc-melbourne.webp", // /mortgage-broker-melbourne
    from: "Location pages/lake-weeroona-in-bendigo-australia-2026-03-19-22-07-03-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "loc-gold-coast.webp", // /mortgage-broker-gold-coast
    from: "Location pages/aerial-view-of-residential-neighborhood-with-water-2026-03-10-02-06-44-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Paid landing pages ─────────────────────────────────────────────────
  // These stop the /lp/ pages borrowing their service page's photograph.
  {
    out: "lp-refinance.webp", // /lp/refinance
    from: "Paid landing pages/smiling-couple-using-laptop-together-at-home-2026-01-06-10-57-30-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "lp-self-employed.webp", // /lp/self-employed-home-loans
    from: "Paid landing pages/smiling-man-in-workshop-with-arms-crossed-2026-01-09-11-01-00-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "lp-doctors.webp", // /lp/doctors-home-loans
    from: "Paid landing pages/smiling-doctor-poses-in-clinic-with-arms-crossed-2026-03-18-16-01-24-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "lp-equipment.webp", // /lp/equipment-finance
    from: "Paid landing pages/construction-site-with-excavator-building-and-tru-2026-07-15-21-34-09-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "lp-commercial.webp", // /lp/commercial-business-loans
    from: "Paid landing pages/confident-man-in-warehouse-environment-with-team-2026-01-05-06-29-24-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Remaining site pages ───────────────────────────────────────────────
  {
    out: "page-about.webp", // /about
    from: "Remaining site pages/couple-meeting-financial-advisor-at-office-desk-2026-03-16-03-30-46-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "page-contact.webp", // /contact
    from: "Remaining site pages/close-up-of-woman-wearing-headset-in-office-2026-03-18-15-44-42-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "page-reviews.webp", // /reviews
    from: "Remaining site pages/smiling-professionals-concluding-a-business-deal-i-2026-03-05-11-55-42-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "page-guides.webp", // /guides
    from: "Remaining site pages/man-reviews-documents-at-modern-wooden-office-desk-2026-01-09-07-23-10-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "page-calculators.webp", // /calculators
    from: "Remaining site pages/modern-home-office-desk-with-laptop-calculator-a-2026-06-16-06-30-35-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Guide articles ─────────────────────────────────────────────────────
  {
    out: "guide-when-to-refinance.webp", // /guides/when-to-refinance
    from: "Guide articles/couple-reviewing-documents-together-at-home-2026-03-17-02-45-31-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "guide-low-doc-home-loans.webp", // /guides/self-employed-home-loans-explained
    from: "Guide articles/managing-finances-with-calculator-and-invoices-ove-2026-03-18-10-44-26-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "guide-lmi-waivers.webp", // /guides/lmi-waiver-professionals
    from: "Guide articles/serious-man-lawyer-at-desk-with-legal-objects-2026-01-09-10-42-00-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "guide-broker-fees.webp", // /guides/how-mortgage-brokers-get-paid
    from: "Guide articles/senior-professional-and-young-colleague-reviewing-2026-06-15-20-13-40-utc.JPG",
    crop: null,
    size: [2400, null],
  },
  {
    out: "guide-low-doc-business.webp", // /guides/low-doc-business-loans-explained
    from: "Guide articles/order-checklist-on-a-wooden-desk-2026-03-24-04-00-31-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "guide-chattel-vs-lease.webp", // /guides/chattel-mortgage-vs-lease
    from: "Guide articles/car-keys-exchange-for-new-purchase-2026-03-10-03-58-03-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Locations, the last two ────────────────────────────────────────────
  {
    out: "loc-sydney.webp", // /mortgage-broker-sydney
    from: "Locations — the two still open/aerial-view-of-a-colorful-suburban-neighborhood-2026-03-25-08-23-33-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "loc-perth.webp", // /mortgage-broker-perth
    from: "Locations — the two still open/aerial-view-of-a-suburban-neighborhood-with-solar-2026-03-09-23-54-42-utc.jpg",
    crop: null,
    size: [2400, null],
  },

  // ── Calculators, from images already supplied ──────────────────────────
  // Five images cover all sixteen calculator pages. They are keyed to the
  // calculator's `kind`, not its slug, so the eight per-state stamp duty
  // pages inherit the stamp duty image and the three repayment tools share
  // one. These are variants of the same instrument rather than separate
  // editorial pages, so a shared image reads as a set — and it saves
  // sourcing eighteen more photographs for pages nobody looks at for the
  // picture.
  {
    out: "calc-stamp-duty.webp", // /calculators/stamp-duty + all 8 state pages
    from: "Home loan services/modern-residential-apartment-buildings-under-a-cle-2026-03-19-10-37-59-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "calc-repayments.webp", // repayments + offset + extra repayments
    from: "Remaining site pages/laptop-and-calculator-on-desk-at-the-workplace-2026-01-07-00-12-12-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "calc-borrowing-capacity.webp", // /calculators/borrowing-capacity
    from: "Guide articles/analyzing-stock-trends-and-making-notes-on-data-2026-01-08-22-07-43-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "calc-lmi.webp", // /calculators/lmi
    from: "Guide articles/handing-over-new-home-keys-to-new-owner-2026-03-20-00-21-03-utc.jpg",
    crop: null,
    size: [2400, null],
  },
  {
    out: "calc-refinance-savings.webp", // /calculators/refinance-savings
    from: "Remaining site pages/man-reads-notes-with-coffee-on-wooden-table-2026-03-26-10-03-11-utc.jpg",
    // Same problem as the receipts shot: the source cuts his face off at the
    // top edge. Dropping the top 12% leaves the notes and the coffee, which
    // is what the picture is about anyway.
    crop: [0, 480, 6000, 3520],
    size: [2400, null],
  },

  // ── Legal pages, from images already supplied ──────────────────────────
  // One image across all three. They are a single set of disclosures, linked
  // together in the footer and read as a group; an adviser talking a client
  // through paperwork suits every one of them.
  {
    out: "legal-compliance.webp", // /credit-guide, /privacy-policy, /complaints-and-disputes
    from: "Remaining site pages/business-meeting-discussing-real-estate-investment-2026-01-07-06-07-00-utc.jpg",
    crop: null,
    size: [2400, null],
  },
];

for (const job of JOBS) {
  const src = path.join(SUPPLIED, job.from);
  let img = sharp(src);

  if (job.crop) {
    const [left, top, width, height] = job.crop;
    const meta = await img.metadata();
    if (left + width > meta.width || top + height > meta.height) {
      throw new Error(
        `${job.out}: crop ${left}+${width} x ${top}+${height} falls outside ` +
          `the ${meta.width}x${meta.height} source`,
      );
    }
    img = img.extract({ left, top, width, height });
  }

  const dest = path.join(OUT, job.out);
  const [width, height] = job.size;
  await img
    // A null height means "keep the source proportions" — used for the hero
    // backdrops, where the shape on screen is the hero's, not the file's.
    .resize(width, height ?? undefined, height ? { fit: "cover" } : undefined)
    .webp({ quality: 82, effort: 5 })
    .toFile(dest);

  const out = await sharp(dest).metadata();
  const { size } = await fs.stat(dest);
  console.log(
    `${job.out.padEnd(24)} ${String(out.width).padStart(4)}x${String(out.height).padEnd(4)}  ${(size / 1024).toFixed(0)} KB`,
  );
}

/*
 * Drop Next's optimised-image cache.
 *
 * next/image caches by source URL, width and quality — not by file contents.
 * Replacing an image in place leaves the URL identical, so without this the
 * dev server keeps serving the previous photograph and it looks as though the
 * swap silently failed. Browsers cache it too, so a hard reload is still
 * needed on top of this.
 */
for (const dir of [".next/cache/images", ".next/dev/cache/images"]) {
  await fs.rm(dir, { recursive: true, force: true });
}
console.log("\nCleared the next/image cache — hard-reload the browser (Ctrl+Shift+R).");
