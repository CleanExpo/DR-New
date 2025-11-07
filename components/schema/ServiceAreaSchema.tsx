import Script from 'next/script';

export const ServiceAreaSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://disaster-recovery-seven.vercel.app/#service-area",
    "name": "Disaster Recovery Service Area",
    "description": "24/7 emergency disaster recovery services covering Brisbane, Ipswich, and Logan regions",
    "provider": {
      "@type": "Organization",
      "name": "Disaster Recovery Queensland",
      "url": "https://disaster-recovery-seven.vercel.app"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.4698,
          "longitude": 153.0251
        },
        "containsPlace": [
          {"@type": "Place", "name": "Hamilton"},
          {"@type": "Place", "name": "Ascot"},
          {"@type": "Place", "name": "New Farm"},
          {"@type": "Place", "name": "Bulimba"},
          {"@type": "Place", "name": "Hawthorne"},
          {"@type": "Place", "name": "Morningside"},
          {"@type": "Place", "name": "Norman Park"},
          {"@type": "Place", "name": "Seven Hills"},
          {"@type": "Place", "name": "Camp Hill"},
          {"@type": "Place", "name": "Carina"},
          {"@type": "Place", "name": "Cannon Hill"},
          {"@type": "Place", "name": "Murarrie"},
          {"@type": "Place", "name": "Balmoral"},
          {"@type": "Place", "name": "Tingalpa"},
          {"@type": "Place", "name": "Wynnum"}
        ]
      },
      {
        "@type": "City",
        "name": "Ipswich",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6141,
          "longitude": 152.7594
        },
        "containsPlace": [
          {"@type": "Place", "name": "Karalee"},
          {"@type": "Place", "name": "Brookwater"},
          {"@type": "Place", "name": "Springfield Lakes"},
          {"@type": "Place", "name": "Augustine Heights"},
          {"@type": "Place", "name": "Bellbird Park"},
          {"@type": "Place", "name": "Camira"},
          {"@type": "Place", "name": "Springfield"},
          {"@type": "Place", "name": "Forest Lake"},
          {"@type": "Place", "name": "Redbank Plains"},
          {"@type": "Place", "name": "Goodna"},
          {"@type": "Place", "name": "Booval"},
          {"@type": "Place", "name": "Bundamba"},
          {"@type": "Place", "name": "Raceview"}
        ]
      },
      {
        "@type": "City",
        "name": "Logan",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6390,
          "longitude": 153.1094
        },
        "containsPlace": [
          {"@type": "Place", "name": "Springwood"},
          {"@type": "Place", "name": "Rochedale"},
          {"@type": "Place", "name": "Shailer Park"},
          {"@type": "Place", "name": "Daisy Hill"},
          {"@type": "Place", "name": "Loganholme"},
          {"@type": "Place", "name": "Tanah Merah"},
          {"@type": "Place", "name": "Underwood"},
          {"@type": "Place", "name": "Eight Mile Plains"},
          {"@type": "Place", "name": "Slacks Creek"},
          {"@type": "Place", "name": "Meadowbrook"},
          {"@type": "Place", "name": "Waterford"},
          {"@type": "Place", "name": "Beenleigh"},
          {"@type": "Place", "name": "Eagleby"}
        ]
      }
    ],
    "serviceType": [
      "Emergency Response",
      "Water Damage Restoration",
      "Fire Damage Restoration",
      "Mould Remediation",
      "Storm Damage Repair",
      "Commercial Restoration"
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disaster-recovery-seven.vercel.app/emergency",
      "servicePhone": "1300 [NUMBER]",
      "availableLanguage": "English",
      "serviceLocation": {
        "@type": "Place",
        "name": "Brisbane Metro Area",
        "geo": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": -27.5,
            "longitude": 153.0
          },
          "geoRadius": "50km"
        }
      }
    },
    "hoursAvailable": {
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
      "closes": "23:59",
      "description": "24/7 Emergency Service"
    },
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "Free",
        "priceCurrency": "AUD",
        "description": "Free emergency assessment and quote"
      },
      "eligibleRegion": {
        "@type": "Place",
        "name": "Southeast Queensland"
      }
    }
  };

  return (
    <Script
      id="service-area-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};