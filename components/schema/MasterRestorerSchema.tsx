import React from 'react';
import Head from 'next/head';

export const MasterRestorerSchema: React.FC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk",
    "name": "Phill McGurk",
    "jobTitle": "Master Restorer",
    "description": "One of a limited number of Master Restorers in Brisbane and Queensland. Over 20 years experience in disaster recovery and restoration.",
    "image": "https://disaster-recovery-seven.vercel.app/images/phill-mcgurk-master-restorer.webp",
    "url": "https://disaster-recovery-seven.vercel.app/about",
    "sameAs": [
      "https://www.linkedin.com/in/phill-mcgurk",
      "https://www.facebook.com/phillmcgurkrestoration"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Disaster Recovery Queensland",
      "url": "https://disaster-recovery-seven.vercel.app"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "IICRC - Institute of Inspection, Cleaning and Restoration Certification"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Master Restorer Certification",
        "issuedBy": {
          "@type": "Organization",
          "name": "Restoration Industry Association"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "IICRC Water Damage Restoration Technician",
        "issuedBy": {
          "@type": "Organization",
          "name": "IICRC"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "IICRC Fire & Smoke Restoration Technician",
        "issuedBy": {
          "@type": "Organization",
          "name": "IICRC"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "IICRC Applied Microbial Remediation Technician",
        "issuedBy": {
          "@type": "Organization",
          "name": "IICRC"
        }
      }
    ],
    "knowsAbout": [
      "Water Damage Restoration",
      "Fire Damage Restoration",
      "Mould Remediation",
      "Storm Damage Recovery",
      "Commercial Restoration",
      "Insurance Claims Management",
      "Emergency Response",
      "Disaster Recovery Planning",
      "Structural Drying",
      "Thermal Imaging",
      "Moisture Detection",
      "Air Quality Testing"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brisbane",
      "addressRegion": "QLD",
      "addressCountry": "AU"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://disaster-recovery-seven.vercel.app",
    "name": "Disaster Recovery Queensland",
    "alternateName": "DR Queensland",
    "description": "Premier disaster recovery and restoration services in Brisbane, Ipswich, and Logan. Led by Master Restorer Phill McGurk.",
    "url": "https://disaster-recovery-seven.vercel.app",
    "logo": "https://disaster-recovery-seven.vercel.app/images/logo.png",
    "image": "https://disaster-recovery-seven.vercel.app/images/office.webp",
    "telephone": "1300 [NUMBER]",
    "email": "info@disasterrecoveryqld.com.au",
    "priceRange": "$$",
    "founder": {
      "@type": "Person",
      "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk",
      "name": "Phill McGurk"
    },
    "employee": {
      "@type": "Person",
      "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk",
      "name": "Phill McGurk"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "@id": "https://www.wikidata.org/wiki/Q34932"
      },
      {
        "@type": "City",
        "name": "Ipswich"
      },
      {
        "@type": "City",
        "name": "Logan"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Disaster Recovery Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "24/7 Emergency Response",
          "description": "Immediate response to disaster emergencies",
          "provider": {
            "@type": "Person",
            "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk"
          }
        },
        {
          "@type": "Service",
          "name": "Water Damage Restoration",
          "description": "Complete water extraction and structural drying",
          "provider": {
            "@type": "Person",
            "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk"
          }
        },
        {
          "@type": "Service",
          "name": "Fire & Smoke Damage Restoration",
          "description": "Fire damage cleanup and smoke odor removal",
          "provider": {
            "@type": "Person",
            "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk"
          }
        },
        {
          "@type": "Service",
          "name": "Mould Remediation",
          "description": "Professional mould removal and prevention",
          "provider": {
            "@type": "Person",
            "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk"
          }
        },
        {
          "@type": "Service",
          "name": "Storm Damage Repair",
          "description": "Storm and flood damage restoration",
          "provider": {
            "@type": "Person",
            "@id": "https://disaster-recovery-seven.vercel.app/#phill-mcgurk"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "award": [
      "Master Restorer Certification",
      "IICRC Certified Firm",
      "Insurance Preferred Provider",
      "Queensland Business Excellence Award"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
};