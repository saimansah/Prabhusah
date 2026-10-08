import React from "react";
import { socialLinks } from "@/data/socials";

export const StructuredData: React.FC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.prabhu-sah.com.np/#person",
    name: "Prabhu Sah",
    alternateName: ["प्रभु साह", "Hon. Prabhu Sah"],
    url: "https://www.prabhu-sah.com.np",
    image: "https://www.prabhu-sah.com.np/images/prabhu-sah-profile.png",
    jobTitle: "Chairman, Aam Janata Party (AJP) & Former Cabinet Minister",
    description:
      "4-time Former Member of Parliament (Rautahat-3, Nepal) and former Cabinet Minister of Urban Development, Law, and Land Management. Advocate for rural agrarian rights, 100% free irrigation, and anti-usury protections.",
    nationality: {
      "@type": "Country",
      name: "Nepal",
    },
    memberOf: {
      "@type": "PoliticalParty",
      name: "Aam Janata Party (AJP)",
      alternateName: "आम जनता पार्टी",
      url: "https://www.prabhu-sah.com.np",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maulapur Municipality",
      addressLocality: "Rautahat",
      addressRegion: "Madhesh Province",
      addressCountry: "NP",
    },
    sameAs: [
      socialLinks.facebook,
      socialLinks.youtube,
      socialLinks.tiktok,
      "https://en.wikipedia.org/wiki/Prabhu_Sah",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.prabhu-sah.com.np/#website",
    url: "https://www.prabhu-sah.com.np",
    name: "Hon. Prabhu Sah Official Portal",
    alternateName: ["प्रभु साह आधिकारिक पोर्टल", "Aam Janata Party Portal"],
    description:
      "Official bilingual portal and citizen grievance system (Janata Sunwai) of Hon. Prabhu Sah.",
    inLanguage: ["ne", "en"],
    publisher: {
      "@id": "https://www.prabhu-sah.com.np/#person",
    },
  };

  const grievanceServiceSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "@id": "https://www.prabhu-sah.com.np/#janata-sunwai",
    name: "Janata Sunwai (जनता सुनुवाइ) - Citizen Grievance Redressal Desk",
    serviceType: "Citizen Grievance & Public Redressal Service",
    provider: {
      "@id": "https://www.prabhu-sah.com.np/#person",
    },
    url: "https://www.prabhu-sah.com.np/#grievance",
    description:
      "Direct citizen grievance redressal desk operated by the personal secretariat of Hon. Prabhu Sah for agricultural irrigation, roads, and administrative assistance.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Rautahat-3, Madhesh Province, Nepal",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.prabhu-sah.com.np/#grievance",
      serviceEmail: socialLinks.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(grievanceServiceSchema) }}
      />
    </>
  );
};
