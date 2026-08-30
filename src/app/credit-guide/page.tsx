import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalTemplate } from "@/components/page/LegalTemplate";
import { legalPages } from "@/data/legal";

const page = legalPages["credit-guide"];

export const metadata: Metadata = {
  title: page?.h1,
  description: page?.intro,
  alternates: { canonical: "/credit-guide" },
  robots: { index: true, follow: true },
};

export default function Page() {
  if (!page) notFound();
  return (
    <LegalTemplate
      eyebrow={page.eyebrow}
      h1={page.h1}
      intro={page.intro}
      slug="credit-guide"
      blocks={page.blocks}
      updated={page.updated}
    />
  );
}
