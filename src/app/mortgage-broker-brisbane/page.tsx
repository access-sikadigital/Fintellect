import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationTemplate } from "@/components/page/LocationTemplate";
import { findLocation } from "@/data/locations";

const page = findLocation("mortgage-broker-brisbane");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/mortgage-broker-brisbane" },
};

export default function Page() {
  if (!page) notFound();
  return <LocationTemplate page={page} />;
}
