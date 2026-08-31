import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Next 16 only serves qualities on this list — anything else returns 400.
     * 75 is the default used everywhere; 88 is reserved for the hero, where
     * the image is large, above the fold and the first thing judged.
     */
    qualities: [75, 88],
    formats: ["image/avif", "image/webp"],
  },
  /* config options here */
};

export default nextConfig;
