import { Hero } from "@/components/sections/Hero";
import { Situations } from "@/components/sections/Situations";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Numbers } from "@/components/sections/Numbers";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { Honesty } from "@/components/sections/Honesty";
import { Coverage } from "@/components/sections/Coverage";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <Process />
      <Numbers />
      <WhyUs />
      <CalculatorTeaser />
      <Honesty />
      <Coverage />

      {/* Organisation + LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: site.name,
            url: `https://${site.domain}`,
            telephone: site.phone,
            email: site.email,
            areaServed: "AU",
            description:
              "Independent mortgage and finance brokers. Refinancing, self-employed and professional lending, commercial and asset finance.",
            identifier: {
              "@type": "PropertyValue",
              name: "Australian Credit Licence",
              value: site.acl,
            },
            address: site.offices.map((city) => ({
              "@type": "PostalAddress",
              addressLocality: city,
              addressCountry: "AU",
            })),
          }),
        }}
      />
    </>
  );
}
