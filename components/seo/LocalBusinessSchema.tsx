'use client';

import Script from 'next/script';

interface LocalBusinessSchemaProps {
  location?: string;
  phoneNumber?: string;
}

export function LocalBusinessSchema({ location = 'Brisbane', phoneNumber = '1300-XXX-XXX' }: LocalBusinessSchemaProps) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://disaster-recovery-seven.vercel.app/#${location.toLowerCase()}`,
    "name": `Disaster Recovery Claims Consulting - ${location}`,
    "alternateName": "Disaster Recovery Insurance Claims Specialists",
    "description": "Expert insurance claims consulting for water damage, fire damage, and mould remediation. 25+ years experience maximizing insurance settlements.",
    "url": "https://disaster-recovery-seven.vercel.app",
    "telephone": phoneNumber,
    "priceRange": "$850-$5000",
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
      "name": "Claims Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Insurance Claims Assessment",
            "description": "Professional assessment for water damage, fire damage, and mould insurance claims"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Second Opinion Services",
            "description": "Independent verification of contractor quotes and insurance assessments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Expert Witness Services",
            "description": "Expert testimony for insurance disputes and litigation"
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
      "Water Damage Assessment",
      "Fire Damage Evaluation",
      "Mould Inspection",
      "Insurance Claims",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "147",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewBody": "Saved us $330,000 on commercial mould remediation. Expert knowledge and honest advice."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "John D."
        },
        "reviewBody": "Their assessment turned our denied claim into full coverage. Worth every dollar."
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
        "name": "What is the difference between a claims consultant and a restoration contractor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A claims consultant provides expert assessment and advocacy for property owners, ensuring maximum insurance settlements. We don't perform physical restoration work but help you find qualified contractors and verify their quotes."
        }
      },
      {
        "@type": "Question",
        "name": "How much can a claims consultant save me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients typically see 10-50x return on investment. Recent cases include $330,000 saved on commercial mould remediation and turning denied claims into full coverage."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work directly with insurance companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional documentation and expert reports that insurance companies require. Our 25+ years of experience means we know exactly what insurers need to approve claims."
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