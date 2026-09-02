import type { MetadataRoute } from "next";
import { allServices, servicePath } from "@/data/services";
import { hubs } from "@/data/hubs";
import { locations } from "@/data/locations";
import { calculators } from "@/data/calculators";
import { publishedGuides } from "@/data/guides";
import { site } from "@/data/site";

const base = `https://${site.domain}`;

/**
 * XML sitemap covering every indexable URL.
 *
 * The five /lp/ landing pages are deliberately excluded — they are noindex
 * paid-traffic pages and must not compete with the SEO pages targeting the
 * same terms (scope §6).
 *
 * Priority follows the build tiers from the keyword map.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priorityForTier = (tier: number) =>
    tier === 1 ? 0.9 : tier === 2 ? 0.7 : 0.5;

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },

    ...hubs.map((h) => ({
      url: `${base}/${h.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityForTier(h.tier),
    })),

    ...allServices.map((s) => ({
      url: `${base}${servicePath(s)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityForTier(s.tier),
    })),

    ...calculators.map((c) => ({
      url: `${base}/calculators/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: priorityForTier(c.tier),
    })),
    {
      url: `${base}/calculators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    ...locations.map((l) => ({
      url: `${base}/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityForTier(l.tier),
    })),

    ...publishedGuides.map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...["about", "reviews", "contact", "guides"].map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...["credit-guide", "privacy-policy", "complaints-and-disputes"].map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
