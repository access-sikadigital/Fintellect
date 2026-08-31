/**
 * FIN-13 — fails if any header link is missing from the footer.
 * Run with: npm run check:nav
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/data/site.ts", "utf8");
const slice = (from, to) =>
  src.slice(src.indexOf(from), to ? src.indexOf(to) : undefined);

const hrefs = (text) => [...text.matchAll(/href: "(\/[^"]*)"/g)].map((m) => m[1]);

const header = new Set(hrefs(slice("export const nav", "export const footerNav")));
const footer = new Set(hrefs(slice("export const footerNav")));

const missing = [...header].filter((h) => !footer.has(h)).sort();

if (missing.length) {
  console.error(`\n✗ ${missing.length} header link(s) missing from the footer:\n`);
  for (const m of missing) console.error("   " + m);
  console.error("");
  process.exit(1);
}

console.log(`\n✓ nav parity — all ${header.size} header links present in the footer\n`);
