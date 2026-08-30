import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/page/ServiceTemplate";
import { smsfServices } from "@/data/services";

const page = smsfServices[0];

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/smsf-loans" },
};

export default function Page() {
  if (!page) notFound();
  return <ServiceTemplate page={page} />;
}
