'use client';

import Script from 'next/script';

export function HomepageStructuredData(...args: any[]): void {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organisation",
    "@id": "https://disaster-recovery-seven.vercel.app/#organisation",
    "name": "Disaster Recovery Australia",
    "url": "https://disaster-recovery-seven.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://disaster-recovery-seven.vercel.app/logos/disaster-recovery-logo.png",
      "width": 600,
      "height": 60
    },
    "description": "Australia's leading IICRC-certified disaster restoration specialists. 24/7 emergency response for water damage, fire damage, mould remediation across Brisbane, Ipswich, Logan and nationwide. Insurance approved contractors.",
    "email": "info@disaster-recovery-seven.vercel.app",
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryAU",
      "https://www.linkedin.com/company/disaster-recovery-australia",
      "https://twitter.com/DisasterRecovAU"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://disaster-recovery-seven.vercel.app/#business",
    "name": "Disaster Recovery Australia",
    "image": "https://disaster-recovery-seven.vercel.app/images/disaster-recovery-og.jpg",
    "url": "https://disaster-recovery-seven.vercel.app",
    "telephone": "+61-1300-DISASTER",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "QLD",
      "addressLocality": "Brisbane"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4698,
      "longitude": 153.0251
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.4698,
          "longitude": 153.0251
        }
      },
      {
        "@type": "City",
        "name": "Ipswich",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6145,
          "longitude": 152.7578
        }
      },
      {
        "@type": "City",
        "name": "Logan",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6386,
          "longitude": 153.1055
        }
      },
      {
        "@type": "State",
        "name": "Queensland"
      },
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Disaster Recovery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Restoration",
            "description": "24/7 water extraction, drying, and restoration services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire & Smoke Damage Restoration",
            "description": "Complete fire damage restoration and smoke removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mould Remediation",
            "description": "Professional mould removal and prevention services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Flood Recovery",
            "description": "Major flood damage restoration and recovery"
          }
        }
      ]
    }
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://disaster-recovery-seven.vercel.app/#website",
    "url": "https://disaster-recovery-seven.vercel.app",
    "name": "Disaster Recovery Australia",
    "description": "24/7 Emergency Disaster Recovery Services Brisbane, Ipswich, Logan & Nationwide",
    "publisher": {
      "@id": "https://disaster-recovery-seven.vercel.app/#organisation"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://disaster-recovery-seven.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-AU"
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
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does your online system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply fill out our online form with your damage details and location. We instantly match you with IICRC certified contractors within your selected radius (20-100km). You'll receive multiple quotes within 30-60 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Why is there a $2,200 minimum service fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The $2,200 minimum covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and insurance documentation. This ensures proper restoration and prevents secondary damage that could cost thousands more."
        }
      },
      {
        "@type": "Question",
        "name": "Are all contractors IICRC certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% of our network contractors must maintain current IICRC certification, carry $20M public liability insurance, and meet strict Disaster Recovery Network standards."
        }
      },
      {
        "@type": "Question",
        "name": "Is insurance coverage available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most disasters are insurance covered. Our contractors bill insurance directly so you only pay your excess. We handle all documentation and claims assistance."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disaster Recovery Australia - 24/7 Emergency Response Brisbane, Ipswich, Logan",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".hero-heading",
        ".hero-description",
        ".emergency-cta"
      ]
    },
    "url": "https://disaster-recovery-seven.vercel.app"
  };

  return (
    <>
      <Script
        id="organisation-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
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
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}