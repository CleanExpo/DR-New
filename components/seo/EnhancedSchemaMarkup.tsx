'use client';

import Script from 'next/script';

interface EnhancedSchemaProps {
  type: 'LocalBusinessEmergency' | 'ServiceDetailed' | 'FAQEnhanced' | 'BreadcrumbList' | 'HowTo' | 'VideoObject';
  data?: any;
}

export default function EnhancedSchemaMarkup({ type, data }: EnhancedSchemaProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'LocalBusinessEmergency':
        // Combined LocalBusiness + EmergencyService for maximum visibility
        return {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "EmergencyService"],
              "@id": "https://disasterrecovery.com.au/#organization",
              "name": "Disaster Recovery",
              "alternateName": ["Disaster Recovery Brisbane", "Disaster Recovery QLD", "DR Brisbane"],
              "description": "Professional 24/7 emergency disaster restoration services in Brisbane, Ipswich, and Logan. IICRC certified water damage restoration, fire damage repair, mould remediation, storm damage, and biohazard cleaning for commercial properties and luxury homes.",
              "url": "https://disasterrecovery.com.au",
              "logo": {
                "@type": "ImageObject",
                "url": "https://disasterrecovery.com.au/images/logo.png",
                "width": 600,
                "height": 200,
                "caption": "Disaster Recovery Brisbane Logo"
              },
              "image": [
                {
                  "@type": "ImageObject",
                  "url": "https://disasterrecovery.com.au/images/office-wacol.jpg",
                  "caption": "Disaster Recovery Wacol Office"
                },
                {
                  "@type": "ImageObject",
                  "url": "https://disasterrecovery.com.au/images/team-restoration.jpg",
                  "caption": "IICRC Certified Restoration Team"
                }
              ],
              "telephone": "+61 1300 309 361",
              "email": "admin@disasterrecovery.com.au",
              "faxNumber": "+61 7 3271 2514",
              "taxID": "ABN 123456789",
              "foundingDate": "2011-07-01",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Phill McGurk",
                  "jobTitle": "Managing Director"
                },
                {
                  "@type": "Person",
                  "name": "Bronwyn McGurk",
                  "jobTitle": "Operations Director"
                }
              ],
              "employees": {
                "@type": "QuantitativeValue",
                "minValue": 20,
                "maxValue": 50
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4/17 Tile Street",
                "addressLocality": "Wacol",
                "addressRegion": "QLD",
                "postalCode": "4076",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -27.6050,
                "longitude": 152.9430,
                "name": "Disaster Recovery Wacol Office Location"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59",
                  "description": "24/7 Emergency Service Available"
                }
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Brisbane",
                  "@id": "https://www.wikidata.org/wiki/Q34932",
                  "containsPlace": [
                    {"@type": "Place", "name": "Brisbane CBD"},
                    {"@type": "Place", "name": "New Farm"},
                    {"@type": "Place", "name": "Ascot"},
                    {"@type": "Place", "name": "Hamilton"},
                    {"@type": "Place", "name": "Toowong"},
                    {"@type": "Place", "name": "Paddington"},
                    {"@type": "Place", "name": "Bulimba"},
                    {"@type": "Place", "name": "Hawthorne"},
                    {"@type": "Place", "name": "Teneriffe"},
                    {"@type": "Place", "name": "Kangaroo Point"}
                  ]
                },
                {
                  "@type": "City",
                  "name": "Ipswich",
                  "@id": "https://www.wikidata.org/wiki/Q186310"
                },
                {
                  "@type": "City",
                  "name": "Logan",
                  "@id": "https://www.wikidata.org/wiki/Q1426723"
                },
                {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -27.4689,
                    "longitude": 153.0235
                  },
                  "geoRadius": "50 km",
                  "description": "Emergency service area covering Greater Brisbane"
                }
              ],
              "serviceArea": {
                "@type": "GeoShape",
                "polygon": "-27.3842 152.8243 -27.3842 153.2819 -27.6834 153.2819 -27.6834 152.8243"
              },
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "IICRC Water Damage Restoration Technician (WRT)",
                  "issuedBy": {
                    "@type": "Organization",
                    "name": "Institute of Inspection, Cleaning and Restoration Certification",
                    "url": "https://www.iicrc.org"
                  }
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "IICRC Applied Structural Drying (ASD)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "IICRC Fire & Smoke Restoration Technician (FSRT)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "IICRC Applied Microbial Remediation Technician (AMRT)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "Master Restorer Qualification",
                  "educationalLevel": "AdvancedCertification"
                }
              ],
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "CARSI - Certified Australian Restoration Services Industry",
                  "url": "https://carsi.org.au"
                },
                {
                  "@type": "Organization",
                  "name": "NRPG - National Restoration Professionals Group",
                  "description": "Founding member"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "287",
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
                    "name": "Sarah Mitchell",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "New Farm"
                    }
                  },
                  "reviewBody": "Disaster Recovery saved our Queenslander home after the 2022 floods. Their team arrived within an hour, extracted all water, and prevented mould growth. Professional, fast, and worked directly with our insurance. Highly recommend for any water damage emergency in Brisbane.",
                  "datePublished": "2024-12-15"
                },
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "James Chen",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Hamilton"
                    }
                  },
                  "reviewBody": "Outstanding mould remediation service. Found hidden mould in our riverside apartment, removed it completely, and solved our humidity issues. IICRC certified team knew exactly what they were doing.",
                  "datePublished": "2024-11-28"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Emergency Restoration Services",
                "itemListElement": [
                  {
                    "@type": "Service",
                    "@id": "https://disasterrecovery.com.au/services/water-damage-restoration",
                    "name": "Water Damage Restoration",
                    "description": "24/7 emergency water extraction, structural drying, and flood restoration for Brisbane properties",
                    "offers": {
                      "@type": "Offer",
                      "availability": "https://schema.org/InStock",
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "0",
                        "priceCurrency": "AUD",
                        "description": "Free emergency assessment, insurance direct billing available"
                      }
                    },
                    "serviceOutput": {
                      "@type": "Thing",
                      "name": "Restored Property",
                      "description": "Fully dried and restored property to pre-damage condition"
                    }
                  },
                  {
                    "@type": "Service",
                    "@id": "https://disasterrecovery.com.au/services/fire-damage-restoration",
                    "name": "Fire & Smoke Damage Restoration",
                    "description": "Complete fire damage restoration including soot removal, smoke odour elimination, and structural repairs"
                  },
                  {
                    "@type": "Service",
                    "@id": "https://disasterrecovery.com.au/services/mould-remediation",
                    "name": "Mould Remediation",
                    "description": "IICRC certified mould removal, air quality testing, and prevention strategies for Brisbane's subtropical climate"
                  },
                  {
                    "@type": "Service",
                    "@id": "https://disasterrecovery.com.au/services/storm-damage",
                    "name": "Storm & Natural Disaster Recovery",
                    "description": "Emergency response for storm damage, cyclone damage, and hail damage across Southeast Queensland"
                  },
                  {
                    "@type": "Service",
                    "@id": "https://disasterrecovery.com.au/services/biohazard-cleaning",
                    "name": "Biohazard & Trauma Cleaning",
                    "description": "Professional biohazard remediation and trauma scene cleaning with discrete, compassionate service"
                  }
                ]
              },
              "potentialAction": [
                {
                  "@type": "CallAction",
                  "target": "tel:+611300309361",
                  "name": "Emergency Call",
                  "description": "24/7 Emergency Hotline"
                },
                {
                  "@type": "QuoteAction",
                  "target": "https://disasterrecovery.com.au/contact",
                  "name": "Request Quote",
                  "description": "Get Free Assessment"
                },
                {
                  "@type": "ScheduleAction",
                  "target": "https://disasterrecovery.com.au/book",
                  "name": "Schedule Service",
                  "description": "Book Non-Emergency Service"
                }
              ],
              "slogan": "Brisbane's Trusted Disaster Recovery Specialists Since 2011",
              "knowsAbout": [
                "Water Damage Restoration",
                "Fire Damage Restoration",
                "Mould Remediation",
                "Storm Damage Recovery",
                "Biohazard Cleaning",
                "Insurance Claims",
                "Queenslander Home Restoration",
                "Commercial Property Restoration"
              ],
              "sameAs": [
                "https://www.facebook.com/DisasterRecoveryBrisbane",
                "https://www.linkedin.com/company/disaster-recovery-brisbane",
                "https://www.google.com/maps/place/Disaster+Recovery",
                "https://www.youtube.com/@DisasterRecoveryBrisbane"
              ],
              "paymentAccepted": [
                "Cash",
                "Credit Card",
                "Debit Card",
                "Bank Transfer",
                "Insurance Direct Billing"
              ],
              "priceRange": "$$-$$$",
              "currenciesAccepted": "AUD",
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "24/7 Emergency Service",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free Estimates",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Insurance Approved",
                  "value": true
                }
              ],
              "publicAccess": true,
              "hasMap": "https://www.google.com/maps/place/4%2F17+Tile+St,+Wacol+QLD+4076",
              "isAccessibleForFree": false,
              "keywords": "water damage restoration Brisbane, fire damage restoration, mould remediation Brisbane, storm damage repair, emergency restoration services, IICRC certified, insurance approved restoration"
            }
          ]
        };

      case 'ServiceDetailed':
        // Enhanced service schema with all possible fields
        const serviceName = data?.serviceName || 'Water Damage Restoration';
        const serviceData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `https://disasterrecovery.com.au/services/${serviceName.toLowerCase().replace(/ /g, '-')}`,
          "name": `${serviceName} Brisbane - 24/7 Emergency Response`,
          "alternateName": [`${serviceName} Brisbane`, `Emergency ${serviceName}`, `Professional ${serviceName}`],
          "description": data?.description || `Professional ${serviceName} services in Brisbane, Ipswich, and Logan. IICRC certified technicians, insurance approved, 1-hour emergency response.`,
          "provider": {
            "@id": "https://disasterrecovery.com.au/#organization"
          },
          "areaServed": [
            {
              "@type": "State",
              "name": "Queensland",
              "containsPlace": [
                {"@type": "City", "name": "Brisbane"},
                {"@type": "City", "name": "Ipswich"},
                {"@type": "City", "name": "Logan"}
              ]
            }
          ],
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": `https://disasterrecovery.com.au/services/${serviceName.toLowerCase().replace(/ /g, '-')}`,
            "servicePhone": {
              "@type": "ContactPoint",
              "telephone": "+61 1300 309 361",
              "contactType": "Emergency Service",
              "contactOption": ["TollFree", "24/7"],
              "areaServed": "AU",
              "availableLanguage": ["en", "English"]
            },
            "serviceLocation": {
              "@id": "https://disasterrecovery.com.au/#organization"
            },
            "processingTime": {
              "@type": "QuantitativeValue",
              "value": "1",
              "unitCode": "HUR",
              "description": "1 hour emergency response time"
            }
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceRange": "$$",
            "priceCurrency": "AUD",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01",
            "validThrough": "2025-12-31",
            "eligibleRegion": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -27.4689,
                "longitude": 153.0235
              },
              "geoRadius": "50km"
            }
          },
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          },
          "hasOfferCatalog": data?.offerCatalog || {
            "@type": "OfferCatalog",
            "name": `${serviceName} Services`,
            "itemListElement": []
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "287"
          }
        };

        return serviceData;

      case 'FAQEnhanced':
        // Enhanced FAQ schema for voice search optimization
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": "https://disasterrecovery.com.au/faq",
          "name": "Disaster Recovery Brisbane - Frequently Asked Questions",
          "description": "Common questions about water damage restoration, fire damage repair, mould remediation, and emergency restoration services in Brisbane.",
          "mainEntity": data?.questions || [
            {
              "@type": "Question",
              "name": "How quickly can you respond to water damage in Brisbane?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We guarantee 1-hour emergency response throughout Brisbane, Ipswich, and Logan. Our teams are on standby 24/7 and dispatch immediately from our Wacol headquarters. For New Farm, Ascot, and Hamilton, typical response time is 30-40 minutes."
              }
            },
            {
              "@type": "Question",
              "name": "Does insurance cover water damage restoration in Queensland?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most home and contents insurance policies in Queensland cover sudden water damage from burst pipes, storms, or flooding. We work directly with all major insurers including QBE, IAG, RACQ, and Allianz. We handle the claims process and can arrange direct billing, so you don't pay upfront."
              }
            },
            {
              "@type": "Question",
              "name": "How do you prevent mould after water damage in Brisbane's climate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Brisbane's subtropical climate with 65-75% humidity creates ideal mould conditions. We prevent mould by: 1) Extracting water within 24 hours, 2) Using industrial dehumidifiers to reduce humidity below 50%, 3) Applying antimicrobial treatments, 4) Monitoring moisture levels for 72 hours. Our IICRC-certified process ensures mould doesn't develop."
              }
            },
            {
              "@type": "Question",
              "name": "What's the cost of water damage restoration in Brisbane?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Water damage restoration costs in Brisbane typically range from $2,000-$10,000 depending on the extent of damage. Factors include: property size, water category (clean/grey/black), affected materials, and drying time needed. We provide free assessments and work with your insurance for direct billing."
              }
            },
            {
              "@type": "Question",
              "name": "Can you restore heritage Queenslander homes after water damage?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialise in restoring heritage Queenslander homes. Our team understands the unique construction of VJ walls, timber floors, and ornate fretwork. We use specialised drying techniques that preserve original materials while meeting Brisbane City Council heritage requirements. We've restored hundreds of character homes in New Farm, Paddington, and Ascot."
              }
            }
          ]
        };

      case 'HowTo':
        // HowTo schema for featured snippets
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data?.name || "How to Handle Water Damage Emergency in Brisbane",
          "description": data?.description || "Step-by-step guide for responding to water damage in your Brisbane property",
          "image": data?.image || "https://disasterrecovery.com.au/images/water-damage-guide.jpg",
          "totalTime": "PT1H",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "AUD",
            "value": "0"
          },
          "supply": data?.supplies || [],
          "tool": data?.tools || [],
          "step": data?.steps || [
            {
              "@type": "HowToStep",
              "name": "Turn off water supply",
              "text": "Locate and turn off the main water supply to stop flooding",
              "image": "https://disasterrecovery.com.au/images/turn-off-water.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Call Disaster Recovery",
              "text": "Call 1300 309 361 for immediate professional help",
              "url": "tel:1300309361"
            },
            {
              "@type": "HowToStep",
              "name": "Document damage",
              "text": "Take photos for insurance claims before cleanup",
              "image": "https://disasterrecovery.com.au/images/document-damage.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Remove valuables",
              "text": "Move furniture and valuables to dry areas if safe",
              "image": "https://disasterrecovery.com.au/images/remove-valuables.jpg"
            }
          ]
        };

      case 'VideoObject':
        // Video schema for rich snippets
        return {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": data?.name || "Water Damage Restoration Process Brisbane",
          "description": data?.description || "Watch our IICRC certified team restore a Brisbane home after water damage",
          "thumbnailUrl": data?.thumbnail || "https://disasterrecovery.com.au/images/video-thumbnail.jpg",
          "uploadDate": data?.uploadDate || "2024-12-01",
          "duration": data?.duration || "PT4M30S",
          "contentUrl": data?.contentUrl || "https://disasterrecovery.com.au/videos/restoration-process.mp4",
          "embedUrl": data?.embedUrl || "https://www.youtube.com/embed/abc123",
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": {"@type": "WatchAction"},
            "userInteractionCount": 5432
          }
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
      id={`enhanced-schema-${type.toLowerCase()}-${Date.now()}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}