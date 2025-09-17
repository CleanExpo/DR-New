import Script from 'next/script';

interface SchemaProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage' | 'BreadcrumbList';
  data?: any;
}

export default function SchemaMarkup({ type, data }: SchemaProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://disasterrecovery.com.au/#organization",
          "name": "Disaster Recovery",
          "alternateName": "Disaster Recovery Brisbane",
          "description": "Professional disaster recovery and restoration services in Brisbane, Ipswich, and Logan. Water damage restoration, fire damage cleanup, mould removal, and emergency restoration services.",
          "url": "https://disasterrecovery.com.au",
          "telephone": "1300309361",
          "email": "info@disasterrecovery.com.au",
          "foundingDate": "2011-07",
          "founders": [
            {
              "@type": "Person",
              "name": "Phill McGurk"
            },
            {
              "@type": "Person",
              "name": "Bronwyn McGurk"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4/17 Tile St",
            "addressLocality": "Wacol",
            "addressRegion": "QLD",
            "postalCode": "4076",
            "addressCountry": "AU"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-27.605",
            "longitude": "152.943"
          },
          "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
          "priceRange": "$$",
          "paymentAccepted": "Cash, Credit Card, Insurance Claims",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Brisbane",
              "sameAs": "https://en.wikipedia.org/wiki/Brisbane"
            },
            {
              "@type": "City",
              "name": "Ipswich",
              "sameAs": "https://en.wikipedia.org/wiki/Ipswich,_Queensland"
            },
            {
              "@type": "City",
              "name": "Logan",
              "sameAs": "https://en.wikipedia.org/wiki/Logan_City"
            }
          ],
          "serviceType": [
            "Water Damage Restoration",
            "Fire Damage Restoration",
            "Mould Remediation",
            "Storm Damage Repair",
            "Biohazard Cleaning",
            "Trauma Scene Cleaning",
            "Emergency Restoration"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "IICRC Certified Technicians"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "Master Restorer Qualification"
            }
          ],
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "24/7 Emergency Response",
                "description": "1 hour emergency response time for disaster recovery services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Insurance Direct Billing",
                "description": "Direct billing to all major insurance companies"
              }
            }
          ],
          "sameAs": [
            "https://www.facebook.com/DisasterRecoveryBrisbane",
            "https://www.google.com/maps/place/4%2F17+Tile+St,+Wacol+QLD+4076"
          ]
        };

      case 'Service':
        const baseService = {
          "@context": "https://schema.org",
          "@type": "Service",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Disaster Recovery",
            "url": "https://disasterrecovery.com.au"
          },
          "areaServed": [
            "Brisbane QLD",
            "Ipswich QLD",
            "Logan QLD",
            "Wacol QLD"
          ],
          "availableChannel": {
            "@type": "ServiceChannel",
            "servicePhone": "1300309361",
            "availableLanguage": ["English"]
          },
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        };

        if (data?.serviceName === 'Water Damage Restoration') {
          return {
            ...baseService,
            "name": "Water Damage Restoration Brisbane",
            "description": "Professional water damage restoration services in Brisbane. We extract water, dry homes, and prevent mould growth. Emergency response in 1 hour.",
            "serviceType": "Water Damage Restoration",
            "category": "Emergency Restoration Service",
            "url": "https://disasterrecovery.com.au/services/water-damage-restoration"
          };
        }

        if (data?.serviceName === 'Fire Damage Restoration') {
          return {
            ...baseService,
            "name": "Fire Damage Restoration Brisbane",
            "description": "Complete fire damage restoration in Brisbane. We clean smoke damage, remove soot, and restore fire-damaged homes and businesses.",
            "serviceType": "Fire Damage Restoration",
            "category": "Emergency Restoration Service",
            "url": "https://disasterrecovery.com.au/services/fire-damage-restoration"
          };
        }

        if (data?.serviceName === 'Mould Remediation') {
          return {
            ...baseService,
            "name": "Mould Removal Brisbane",
            "description": "Safe mould removal and remediation services in Brisbane. We remove mould safely and prevent it from returning.",
            "serviceType": "Mould Remediation",
            "category": "Environmental Restoration Service",
            "url": "https://disasterrecovery.com.au/services/mould-remediation"
          };
        }

        return baseService;

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How fast do you respond to emergencies in Brisbane?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We respond to emergency calls in Brisbane within 1 hour. Our team is available 24/7 for water damage, fire damage, and other disaster recovery emergencies."
              }
            },
            {
              "@type": "Question",
              "name": "Do you work with insurance companies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we work directly with all major insurance companies. We can handle direct billing and help you through the insurance claims process."
              }
            },
            {
              "@type": "Question",
              "name": "What areas do you service in Brisbane?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We service all of Brisbane, Ipswich, Logan and surrounding areas within 50km of our Wacol office. We provide emergency response to Gold Coast and Sunshine Coast."
              }
            },
            {
              "@type": "Question",
              "name": "Are your technicians certified?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our technicians hold IICRC certifications and Master Restorer qualifications. We maintain the highest industry standards for all restoration work."
              }
            },
            {
              "@type": "Question",
              "name": "What types of disasters do you handle?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We handle water damage, fire damage, smoke damage, mould remediation, storm damage, flood damage, biohazard cleaning, and trauma scene cleaning."
              }
            }
          ]
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((crumb: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
          })) || []
        };

      default:
        return {};
    }
  };

  const schemaData = getSchemaData();

  return (
    <Script
      id={`schema-${type.toLowerCase()}-${Date.now()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}