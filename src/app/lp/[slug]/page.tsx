import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/page/LandingTemplate";
import { landingPages, findLandingPage } from "@/data/landing";

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    // Paid landing pages must never compete with the SEO pages — scope §6.
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) notFound();
  return <LandingTemplate page={page} />;
}
