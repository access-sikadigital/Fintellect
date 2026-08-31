# Lender logos — FIN-08

Drop the approved lender logos here (SVG preferred, or WebP at ~256px wide),
then list them in `src/data/proof.ts`:

```ts
export const lenders: Lender[] = [
  { name: "Commonwealth Bank", logo: "/brand/lenders/cba.svg" },
];
```

The strip renders as soon as the array has entries, and renders nothing while
it is empty — so the live site never shows a hollow logo band.

**Do not add a logo that is not on the client's approved lender list.**
Displaying a bank's mark without authorisation is a real problem for a site
operating under a credit licence.
