# Fintellect — Website

Next.js build of **fintellect.com.au**, produced by Sika Digital from the
Fintellect Website Scope (13 August 2026), the accompanying keyword workbook,
and the Brand Guidelines (2026).

**All 55 URLs in the sitemap are built.** 50 indexable pages plus 5 noindex
paid-traffic landing pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — 59 static pages
npm run test:calc  # calculator boundary tests
npm run lint
```

---

## What's here

| Section | Pages | Status |
| --- | --- | --- |
| Core | 7 | Home, about, reviews, contact + 3 compliance pages |
| Home loans | 9 | Hub + 8 services |
| Commercial finance | 5 | Hub + 4 services |
| Asset finance | 6 | Hub + 5 services |
| SMSF | 1 | |
| Calculators | 16 | All working, with boundary tests |
| Locations | 5 | Melbourne and Gold Coast are offices |
| Guides | 1 | Hub built; the 12 articles are the next content run |
| Paid landing pages | 5 | Noindex, no site nav |

Everything is statically generated. Verified: 57/57 routes return 200,
type-check clean, lint clean, 132 calculator tests passing.

---

## Architecture

Pages are **generated from data, not hand-built**. Adding a service page means
adding an object to `src/data/services/`, not writing a component.

```
src/
├── data/
│   ├── types.ts            Content model — the 11-section service blueprint
│   ├── shared.ts           Speed claim, credentials, objections, qualifying rules
│   ├── services/           18 service pages, grouped by section
│   ├── hubs.ts             3 section hubs
│   ├── locations.ts        5 city pages
│   ├── calculators.ts      16 calculator pages (8 state pages generated)
│   ├── legal.ts            Credit guide, privacy, complaints
│   ├── landing.ts          5 paid landing pages
│   └── guides.ts           Launch guide set
├── components/page/        The six templates + shared page sections
├── lib/calculators/
│   ├── rates.ts            ⚠ ALL rates. Single edit point. Unverified.
│   └── engine.ts           Pure calculation functions
└── scripts/
    └── test-calculators.mjs  Boundary tests
```

### Templates

`ServiceTemplate` renders the eleven-section blueprint from scope §7.1 —
hero, qualifying strip, what a bank won't give you, speed, how it works,
proof, credentials, objections, FAQ, enquiry form, compliance footer. Every
service page uses it, so the compliance furniture is identical everywhere.

Also `HubTemplate`, `CalculatorTemplate`, `LocationTemplate`, `LegalTemplate`
and `LandingTemplate`.

### Lead qualification

`EnquiryForm` implements scope §7.3 rather than a generic contact form:

- **Purpose is asked first** — Robert's own opening question
- **Qualifying questions come before contact details**, so a partial
  completion still tells you something
- **Per-service question sets** drawn from the discovery form's criteria
- **Soft flags, never a rejection** — disqualifying answers route the enquiry
  rather than blocking it
- **A deliberate "just looking" path**, so those leads are captured for the
  six-month follow-up instead of lost
- Four steps with a progress indicator

⚠ **Not yet wired to a CRM.** The payload shape is built and commented in
`EnquiryForm.tsx`; Salestrekker integration is blocked on confirming the
method (API, webhook or email parse) — scope "Items to confirm".

---

## Calculators

All 16 work. The engine is pure functions in `engine.ts`, unit tested at
every bracket boundary, threshold and edge case — 132 assertions covering
duty continuity in all 8 states, repayments, LMI bands, offset, extra
repayments, refinance break-even and borrowing capacity.

Three real bugs were caught by those tests during the build, including an NT
duty formula that understated duty on a $525,000 purchase by a factor of
three.

### ⚠ Rates need verification before launch

`src/lib/calculators/rates.ts` holds **every** publishable number — duty
schedules for all 8 states, LMI bands, assessment assumptions. Nothing is
hard-coded into a page.

The file exports `RATES_VERIFIED = false`. While that is false, calculator
pages carry an extra disclaimer. Before launch:

1. Check each schedule against the revenue office named in its `source` field
2. Replace the LMI table with lender-supplied figures
3. Run `npm run test:calc`
4. Set `RATES_VERIFIED = true` and record the date

Two known deviations to resolve: **NSW** indexes its thresholds annually, and
the **QLD** table is the general rate — the home concession for owner-occupiers
is significantly lower and is not applied.

---

## Brand system

`globals.css` contains the four guideline hex values plus two additions,
both deliberate and both documented in the file: **clay** `#B9633F` (the warm
accent, approved 31 Aug) and **white** `#FFFFFF`, reserved for form surfaces
only so the enquiry form reads as an object on the page rather than part of
it. Every other surface is one of them mixed with transparency. Audit
confirms zero off-brand Tailwind colour utilities in `src/`.

| Token | Hex | Role |
| --- | --- | --- |
| `offwhite` | `#FBFEEE` | Primary light surface |
| `sand` | `#E2E6D1` | Secondary light surface |
| `green` | `#206943` | Accent, CTAs, links |
| `forest` | `#012412` | Dark sections, body text |

Type per guideline p.18: Fraunces SemiBold titles, Inter Bold subtitles, Inter
Regular body, Inter SemiBold labels at 20% tracking. Self-hosted variable
woff2, no external font requests. `Icon.tsx` inlines all 33 brand icons with
`currentColor`.

---

## Technical SEO

- Server-rendered HTML on every indexable page
- `sitemap.xml` — 50 URLs, priority by build tier, `/lp/` excluded
- `robots.txt` disallowing `/lp/`, plus page-level noindex on those five
- Canonicals and per-page metadata throughout
- Schema: Service, FAQPage, BreadcrumbList, WebApplication (calculators),
  FinancialService with LocalBusiness data on the two office locations
- Every calculator has its own indexable URL with server-rendered supporting
  content — a page of pure JavaScript cannot rank for its own term

---

## Before launch

**Compliance**
- [ ] Licensee approval pass on all copy — required, not optional
- [ ] Replace the credit guide with the licensee's own document
- [ ] Legal review of privacy and complaints pages
- [ ] Supply required disclaimer wording (placeholders in `shared.ts`)
- [ ] Verify calculator rates, then set `RATES_VERIFIED = true`

**Substantiation**
- [ ] Every published figure — 22 minutes, 217 settled, 90%, $0 fee — appears
      on the home page, about page and service pages. All must be evidenced.

**Content gaps**
- [ ] **Photography of Robert, the team and both offices.** Still the largest
      gap. No stock stand-in is used on the about page.
- [ ] **Reviews and case studies.** `/reviews` is built and deliberately empty
      — nothing is fabricated. Populate from Google Business Profile and the
      five deal stories.
- [ ] **Truck and vehicle photography.** Those three asset pages currently run
      a typographic hero because no suitable image exists.
- [ ] The 12 launch guides — briefs are in `src/data/guides.ts`

**Integration**
- [ ] Salestrekker — confirm method, then wire `EnquiryForm`
- [ ] GA4, GTM, Google Ads and Meta CAPI conversion tracking
- [ ] Call tracking with dynamic number insertion
- [ ] Confirm which phone number to use — the scope flags a discrepancy
- [ ] Claim and verify both Google Business Profiles

**Excluded by instruction**
First home buyer keywords and pages, at Robert's direction.

---

## Change round 1 — 31 August 2026 · SIGNED OFF

Worked from `Fintellect Change Brief.pdf` and `Fintellect_Change_Spec.docx`
(John's review of the live site, 30 Aug). **John signed off the outstanding
decisions on 31 Aug** — headline, warm accent, CTA wording and the Record
figures are all approved and live.

| # | Item | Status |
| --- | --- | --- |
| FIN-01 | Hero headline — "We reach lenders other brokers can't." | ✅ approved |
| FIN-02 | "Speed is the part nobody else is selling" replaced | ✅ |
| FIN-03 | "Four steps. No chasing." replaced (cards untouched) | ✅ |
| FIN-04 | "Two offices. Every postcode." demoted to a fact | ✅ |
| FIN-05 | Counters SSR the real figure — never zeros | ✅ |
| FIN-06 | Warm clay accent, applied across the site | ✅ approved |
| FIN-07 | Concept clip, house mask **and** stock broker portraits removed | ✅ |
| FIN-08 | Lender logo strip built | ⛔ awaiting logo assets |
| FIN-09 | Reviews section built | ⛔ awaiting real Google reviews |
| FIN-10 | Team block built | ⛔ awaiting broker photos |
| FIN-11 | ACL 515382 leads the hero credential strip | ✅ |
| FIN-12 | One primary CTA, defined once in `site.cta` | ✅ approved |
| FIN-13 | Header ↔ footer parity + `npm run check:nav` guard | ✅ |
| SPEC | "22 minutes" reduced to one instance, with its sourcing | ✅ |
| SPEC | Whole-page copy tone pass | ✅ |
| SPEC | Reveal timing, reduced motion, mobile QA | ✅ |

### Spec sign-off checklist

- [x] P1 Hero headline rewritten & approved by John
- [x] P1 Hero image swapped to a real/human image
- [x] P1 All counters show real numbers (never zeros)
- [x] P1 "How it works" + "Speed is the part…" headers rewritten
- [x] P1 "Two offices. Every postcode." header rewritten
- [ ] P1 Lender logo strip added — **built, awaiting logos**
- [x] P1 Warm accent colour added — palette approved by John
- [x] P2 Reviews/testimonials section added (built) or flagged to John
- [ ] P2 Real team photo(s) / broker block — **built, awaiting photos**
- [x] P2 Whole-page copy tone pass done
- [x] P2 Header and footer nav match
- [x] P2 Mobile QA passed
- [ ] P3 Awards/accreditation badges — **needs the list of what Fintellect holds**
- [x] P3 Reveal-on-scroll timing checked

### The warm palette

Clay `#B9633F` — the muted complement of the brand green. Green remains the
base; clay carries labels, rules, step numbers, stat figures, icon badges and
secondary buttons. Two warm neutrals (`paper-warm`, `sand-deep`) and a warmed
dark (`forest-warm`) give the page tonal range, so consecutive sections no
longer read as the same cream and the same green.

### Still blocked on assets

`src/data/proof.ts` holds three empty arrays — `lenders`, `reviews`, `team`.
Each section checks its array and **renders nothing while it is empty**, so the
live site never shows a hollow band. Filling one array in is the entire job
once assets arrive.

Nothing is fabricated. Inventing testimonials or displaying unapproved bank
logos under ACL 515382 is not a shortcut worth taking — and it is exactly what
would make the site read as AI-built again.

**To finish FIN-08/09/10, three things are needed from the client:**

1. The approved lender list plus logo files → `/public/brand/lenders/`
2. Real Google reviews with names → `reviews` in `src/data/proof.ts`
3. Broker photography and names → `/public/brand/team/` and `team`

**Also outstanding:** which accreditations Fintellect actually holds
(MFAA / FBAA / other) for FIN-11, and real client photography to replace the
remaining stock situation images.

### Kept, per the brief

"Four situations", "The honest part", the credit-licence angle, the
"Know the number before you talk" calculator section, and the "Straight
answers" FAQ were all left alone.
