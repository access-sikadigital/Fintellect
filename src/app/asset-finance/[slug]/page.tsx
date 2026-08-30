import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/page/ServiceTemplate";
import { servicesInSection, findService } from "@/data/services";

export function generateStaticParams() {
  return servicesInSection("asset-finance").map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findService("asset-finance", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/asset-finance/${page.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findService("asset-finance", slug);
  if (!page) notFound();
  return <ServiceTemplate page={page} />;
}
