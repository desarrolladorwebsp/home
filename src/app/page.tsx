import { Hero } from "@/components/hero";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { HomeBenefitsSection } from "@/components/sections/home-benefits-section";
import { HomeCareSection } from "@/components/sections/home-care-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { santiagoOffice } from "@/lib/contact-details";
import { contactPhone } from "@/lib/contact-phones";
import { pageMetadata, siteName, sitePages, siteUrl } from "@/lib/site-seo";
import { socialProfiles } from "@/lib/social-profiles";

export const metadata = pageMetadata("/");

const organizationId = siteUrl("/#organizacion");
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      alternateName: "HMC",
      url: siteUrl("/"),
      description: sitePages["/"].description,
      logo: siteUrl("/seo/logo-hmc.png"),
      sameAs: Object.values(socialProfiles),
      email: "contacto@hmc.cl",
      telephone: contactPhone.href.slice(4),
      address: {
        "@type": "PostalAddress",
        streetAddress: santiagoOffice.address,
        addressLocality: santiagoOffice.city,
        addressRegion: santiagoOffice.region,
        addressCountry: "CL",
      },
    },
    {
      "@type": "WebSite",
      "@id": siteUrl("/#sitio-web"),
      url: siteUrl("/"),
      name: siteName,
      alternateName: "HMC",
      inLanguage: "es-CL",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema).replace(/</g, "\\u003c") }}
      />
      <div id="inicio"><Hero /></div>
      <HomeCareSection preview />
      <HomeBenefitsSection />
      <HowItWorksSection />
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
