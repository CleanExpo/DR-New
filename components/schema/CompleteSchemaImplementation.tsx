import React from 'react';
import Script from 'next/script';

interface CompleteSchemaProps {
  pageType?: 'home' | 'service' | 'location' | 'about' | 'contact';
  pageName?: string;
  pageDescription?: string;
  serviceType?: string;
  locationName?: string;
}

export const CompleteSchemaImplementation: React.FC<CompleteSchemaProps> = ({
  pageType = 'home',
  pageName = 'Disaster Recovery Qld',
  pageDescription = 'Queensland Premier Disaster Recovery Service - Master Restorer Phill McGurk',
  serviceType,
  locationName
}) => {
  // Complete integrated schema for maximum SEO impact
  const completeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization
      {
        "@type": "Organization",
        "@id": "https://www.disasterrecovery.com.au/#organization",
        "name": "Disaster Recovery Qld",
        "alternateName": "Disaster Recovery Queensland",
        "url": "https://www.disasterrecovery.com.au",
        "logo": "https://www.disasterrecovery.com.au/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+61-1300-000-000",
          "contactType": "emergency",
          "areaServed": "AU",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.facebook.com/DisasterRecoveryQld",
          "https://www.linkedin.com/company/disaster-recovery-qld"
        ]
      },
      // 2. LocalBusiness
      {
        "@type": "LocalBusiness",
        "@id": "https://www.disasterrecovery.com.au/#localbusiness",
        "name": "Disaster Recovery Qld",
        "image": "https://www.disasterrecovery.com.au/images/storefront.jpg",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Brisbane",
          "addressRegion": "QLD",
          "postalCode": "4000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.4705,
          "longitude": 153.0260
        },
        "url": "https://www.disasterrecovery.com.au",
        "telephone": "+61-1300-000-000",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127"
        }
      },
      // 3. Emergency Service
      {
        "@type": "EmergencyService",
        "@id": "https://www.disasterrecovery.com.au/#emergency",
        "name": "24/7 Emergency Disaster Response",
        "serviceType": "Water Damage, Fire Damage, Storm Recovery",
        "areaServed": {
          "@type": "Place",
          "name": "Brisbane, Ipswich, Logan"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://www.disasterrecovery.com.au/emergency",
          "servicePhone": "+61-1300-000-000",
          "availableLanguage": "en-AU"
        }
      },
      // 4. Person (Phill McGurk)
      {
        "@type": "Person",
        "@id": "https://www.disasterrecovery.com.au/#phillmcgurk",
        "name": "Phill McGurk",
        "jobTitle": "Master Restorer",
        "worksFor": {
          "@id": "https://www.disasterrecovery.com.au/#organization"
        },
        "description": "One of a Limited Number of Master Restorers in Brisbane & QLD",
        "knowsAbout": [
          "Water Damage Restoration",
          "Fire Damage Restoration",
          "Mould Remediation",
          "Disaster Recovery",
          "Insurance Claims"
        ],
        "alumniOf": {
          "@type": "Organization",
          "name": "IICRC"
        }
      },
      // 5. Service (if service page)
      ...(serviceType ? [{
        "@type": "Service",
        "@id": `https://www.disasterrecovery.com.au/services/${serviceType}`,
        "name": `${serviceType} Services`,
        "provider": {
          "@id": "https://www.disasterrecovery.com.au/#organization"
        },
        "areaServed": {
          "@type": "Place",
          "name": locationName || "Brisbane, Ipswich, Logan"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${serviceType} Service Options`
        }
      }] : []),
      // 6. Place (if location page)
      ...(locationName ? [{
        "@type": "Place",
        "@id": `https://www.disasterrecovery.com.au/locations/${locationName}`,
        "name": `${locationName} Service Area`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": locationName,
          "addressRegion": "QLD",
          "addressCountry": "AU"
        }
      }] : []),
      // 7. WebPage
      {
        "@type": "WebPage",
        "@id": `https://www.disasterrecovery.com.au/${pageType}#webpage`,
        "url": `https://www.disasterrecovery.com.au/${pageType}`,
        "name": pageName,
        "description": pageDescription,
        "isPartOf": {
          "@id": "https://www.disasterrecovery.com.au/#website"
        },
        "about": {
          "@id": "https://www.disasterrecovery.com.au/#localbusiness"
        },
        "dateModified": new Date().toISOString()
      },
      // 8. WebSite
      {
        "@type": "WebSite",
        "@id": "https://www.disasterrecovery.com.au/#website",
        "url": "https://www.disasterrecovery.com.au",
        "name": "Disaster Recovery Qld",
        "description": "Emergency Disaster Recovery Services",
        "publisher": {
          "@id": "https://www.disasterrecovery.com.au/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.disasterrecovery.com.au/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      // 9. FAQPage
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you provide 24/7 emergency service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide 24/7 emergency response across Brisbane, Ipswich, and Logan."
            }
          },
          {
            "@type": "Question",
            "name": "Are you insurance approved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we work directly with all major insurance companies with direct billing available."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script id="schema-complete" type="application/ld+json">
        {JSON.stringify(completeSchema)}
      </Script>
      {/* Google Tag Manager - Add your GTM ID */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXX');
        `}
      </Script>
    </>
  );
};

export default CompleteSchemaImplementation;