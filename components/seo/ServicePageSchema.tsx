'use client';

import EnhancedSchemaMarkup from './EnhancedSchemaMarkup';

interface ServicePageSchemaProps {
  serviceName: string;
  serviceDescription?: string;
  serviceUrl?: string;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  howToSteps?: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}

export default function ServicePageSchema({
  serviceName,
  serviceDescription,
  serviceUrl,
  breadcrumbs,
  faqs,
  howToSteps
}: ServicePageSchemaProps) {

  // Generate service-specific FAQs if not provided
  const defaultFaqs = [
    {
      question: `How quickly can Disaster Recovery respond to ${serviceName} emergencies in Brisbane?`,
      answer: `We guarantee a 1-hour emergency response time for ${serviceName} across Brisbane, Ipswich, Logan, Gold Coast, and Sunshine Coast. Our IICRC certified technicians are available 24/7 through our emergency hotline 1300 309 361.`
    },
    {
      question: `Is ${serviceName} covered by insurance in Queensland?`,
      answer: `Most home and contents insurance policies in Queensland cover ${serviceName}. Disaster Recovery is approved by all major insurers including QBE, IAG, RACQ, and Allianz. We handle direct billing so you don't pay upfront.`
    },
    {
      question: `What certifications does Disaster Recovery hold for ${serviceName}?`,
      answer: `Our technicians hold IICRC certifications specific to ${serviceName}, plus we're CARSI members and founding members of NRPG. We maintain $20 million public liability insurance.`
    },
    {
      question: `What's the cost of ${serviceName} in Brisbane?`,
      answer: `${serviceName} costs vary based on the extent of damage, property size, and specific requirements. We provide free assessments and work directly with your insurance for billing. Contact us at 1300 309 361 for a quote.`
    },
    {
      question: `How long does ${serviceName} take to complete?`,
      answer: `The timeline for ${serviceName} depends on the severity and scope of damage. Minor cases may be resolved in 24-48 hours, while extensive restoration can take 3-7 days. We provide detailed timelines during our initial assessment.`
    }
  ];

  // Generate HowTo steps if not provided
  const defaultHowToSteps = [
    {
      name: "Emergency Contact",
      text: "Call Disaster Recovery at 1300 309 361 for immediate 24/7 response",
      image: "https://disasterrecovery.com.au/images/how-to/step1-call.jpg"
    },
    {
      name: "Rapid Response",
      text: "Our IICRC certified team arrives within 1 hour to assess the damage",
      image: "https://disasterrecovery.com.au/images/how-to/step2-arrival.jpg"
    },
    {
      name: "Assessment & Documentation",
      text: "Complete damage assessment and insurance documentation with photos and reports",
      image: "https://disasterrecovery.com.au/images/how-to/step3-assessment.jpg"
    },
    {
      name: "Restoration Process",
      text: `Professional ${serviceName} following IICRC S500/S520 standards`,
      image: "https://disasterrecovery.com.au/images/how-to/step4-restoration.jpg"
    },
    {
      name: "Monitoring & Drying",
      text: "Continuous monitoring with moisture meters and thermal imaging",
      image: "https://disasterrecovery.com.au/images/how-to/step5-monitoring.jpg"
    },
    {
      name: "Quality Assurance",
      text: "Final inspection, insurance approval, and warranty provision",
      image: "https://disasterrecovery.com.au/images/how-to/step6-completion.jpg"
    }
  ];

  // Default breadcrumbs if not provided
  const defaultBreadcrumbs = [
    { name: "Home", url: "https://disasterrecovery.com.au" },
    { name: "Services", url: "https://disasterrecovery.com.au/services" },
    { name: serviceName, url: serviceUrl || `https://disasterrecovery.com.au/services/${serviceName.toLowerCase().replace(/ /g, '-')}` }
  ];

  return (
    <>
      {/* Service-specific detailed schema */}
      <EnhancedSchemaMarkup
        type="ServiceDetailed"
        data={{
          serviceName,
          description: serviceDescription || `Professional ${serviceName} services in Brisbane, Ipswich, and Logan. IICRC certified technicians, insurance approved, 1-hour emergency response. Available 24/7 - Call 1300 309 361.`,
          offerCatalog: {
            "@type": "OfferCatalog",
            "name": `${serviceName} Services Brisbane`,
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Emergency ${serviceName}`,
                  "description": `24/7 emergency ${serviceName} with 1-hour response time`
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "0",
                  "priceCurrency": "AUD",
                  "description": "Free assessment, insurance direct billing available"
                },
                "availability": "https://schema.org/InStock",
                "availableDeliveryMethod": "https://schema.org/OnSiteService",
                "areaServed": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -27.4689,
                    "longitude": 153.0235
                  },
                  "geoRadius": "50 km"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Insurance Approved ${serviceName}`,
                  "description": "Direct billing with all major insurers"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Commercial ${serviceName}`,
                  "description": "Large-scale commercial property restoration"
                }
              }
            ]
          }
        }}
      />

      {/* FAQ Schema for voice search optimization */}
      <EnhancedSchemaMarkup
        type="FAQEnhanced"
        data={{
          questions: faqs || defaultFaqs
        }}
      />

      {/* HowTo Schema for featured snippets */}
      <EnhancedSchemaMarkup
        type="HowTo"
        data={{
          name: `Professional ${serviceName} Process in Brisbane`,
          description: `Step-by-step guide for ${serviceName} by IICRC certified technicians`,
          image: `https://disasterrecovery.com.au/images/services/${serviceName.toLowerCase().replace(/ /g, '-')}.jpg`,
          supplies: [
            "Professional restoration equipment",
            "IICRC certified technicians",
            "Insurance approved processes",
            "$20 million public liability insurance"
          ],
          tools: [
            "Industrial dehumidifiers",
            "HEPA air scrubbers",
            "Thermal imaging cameras",
            "Moisture meters",
            "Air movers",
            "Antimicrobial treatments"
          ],
          steps: howToSteps || defaultHowToSteps
        }}
      />

      {/* Breadcrumb Schema for navigation */}
      <EnhancedSchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: breadcrumbs || defaultBreadcrumbs
        }}
      />
    </>
  );
}