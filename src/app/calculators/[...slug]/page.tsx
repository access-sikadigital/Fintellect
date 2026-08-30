import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorTemplate } from "@/components/page/CalculatorTemplate";
import { calculators, findCalculator } from "@/data/calculators";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug.split("/") }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findCalculator(slug.join("/"));
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/calculators/${page.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = findCalculator(slug.join("/"));
  if (!page) notFound();
  return <CalculatorTemplate page={page} />;
}
