import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HubTemplate } from "@/components/page/HubTemplate";
import { findHub } from "@/data/hubs";

const hub = findHub("home-loans");

export const metadata: Metadata = {
  title: hub?.title,
  description: hub?.metaDescription,
  alternates: { canonical: "/home-loans" },
};

export default function Page() {
  if (!hub) notFound();
  return <HubTemplate hub={hub} />;
}
