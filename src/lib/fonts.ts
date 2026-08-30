import localFont from "next/font/local";

/**
 * Fintellect typography — Brand Guidelines, section 03.
 *
 * Primary typeface  : Inter    — body, CTA, subtitles, labels.
 * Secondary typeface: Fraunces — titles and quotes only.
 *
 * Both are shipped as variable fonts so the full weight range is available
 * from a single file. Optical size is driven per-role in globals.css.
 */

export const inter = localFont({
  src: [{ path: "../assets/fonts/Inter-Variable.woff2", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const fraunces = localFont({
  src: [{ path: "../assets/fonts/Fraunces-Variable.woff2", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
