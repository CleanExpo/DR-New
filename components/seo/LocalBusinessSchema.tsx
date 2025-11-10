'use client';

import Script from 'next/script';

interface LocalBusinessSchemaProps {
  location?: string;
  phoneNumber?: string;
}

export function LocalBusinessSchema(...args: any[]): void {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://disaster-recovery-seven.vercel.app/#${location.toLowerCase()}`,
    "name": `Disaster Recovery Queensland - ${location}`,
    "alternateName": "Master Restorer - Phill McGurk",
    "description": "24/7 emergency disaster recovery and restoration services. IICRC certified Master Restorer with 25+ years experience. Water damage, fire damage, mould remediation specialist.",
    "url": "https://disaster-recovery-seven.vercel.app",
    "telephone": `+61-${  phoneNumber}`,
    "priceRange": "$330+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": "QLD",
      "addressCountry": "AU",
      "postalCode": location === "Brisbane" ? "4000" : "4305"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location === "Brisbane" ? -27.4698 : -27.6144,
      "longitude": location === "Brisbane" ? 153.0251 : 152.7594
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Restoration Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Restoration",
            "description": "24/7 emergency water extraction, drying, and restoration services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Damage Restoration",
            "description": "Complete fire damage restoration including smoke and soot removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mould Remediation",
            "description": "Professional mould removal and remediation by certified specialists"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "@id": "https://www.wikidata.org/wiki/Q34932"
      },
      {
        "@type": "City",
        "name": "Ipswich",
        "@id": "https://www.wikidata.org/wiki/Q183467"
      },
      {
        "@type": "City",
        "name": "Logan",
        "@id": "https://www.wikidata.org/wiki/Q1426317"
      }
    ],
    "knowsAbout": [
      "Water Damage Restoration",
      "Fire Damage Restoration",
      "Mould Remediation",
      "Storm Damage Repair",
      "Building Codes",
      "IICRC Standards",
      "Australian Standards"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Certification",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "25+ Years Industry Experience",
        "credentialCategory": "Experience"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryBrisbane",
      "https://www.linkedin.com/company/disaster-recovery-claims-consulting",
      "https://twitter.com/DisasterRecovAU"
    ],
    "potentialAction": {
      "@type": "ContactAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://disaster-recovery-seven.vercel.app/contact",
        "inLanguage": "en-AU",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Thing",
        "name": "Insurance Claims Consultation"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disaster-recovery-seven.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://disaster-recovery-seven.vercel.app/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Case Studies",
        "item": "https://disaster-recovery-seven.vercel.app/case-studies"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Disaster Recovery Queensland different from other restoration companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phill McGurk is one of only a limited number of Master Restorers in Brisbane and Queensland. With 25+ years experience and IICRC certification, we provide 24/7 emergency response with the highest level of expertise."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you respond to an emergency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide 24/7 emergency response across Brisbane, Ipswich and Logan. Our rapid response team can be on-site within hours to prevent secondary damage and begin the restoration process."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with insurance companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are insurance approved and work directly with all major insurance companies. We handle the documentation and communication to ensure smooth claim processing."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}