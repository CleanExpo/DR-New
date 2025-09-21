// Emergency Service Schema - CRITICAL for 24/7 services
export const EmergencyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "@id": "https://www.disasterrecovery.com.au/#emergency",
  "name": "Disaster Recovery Qld - 24/7 Emergency Response",
  "description": "24/7 emergency water damage restoration, fire damage recovery, and disaster response services across Brisbane, Ipswich, and Logan by Master Restorer Phill McGurk",
  "url": "https://www.disasterrecovery.com.au",
  "telephone": "+61-1300-000-000",
  "email": "emergency@disasterrecovery.com.au",
  "availableLanguage": ["en-AU"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Brisbane, Ipswich & Logan",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Queensland",
      "addressCountry": "AU"
    }
  },
  "knowsAbout": [
    "Water Damage Restoration",
    "Fire Damage Restoration",
    "Flood Recovery",
    "Storm Damage",
    "Mould Remediation",
    "Emergency Response"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Emergency Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "24/7 Water Damage Response",
          "description": "Immediate response for water damage emergencies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Emergency Fire Restoration",
          "description": "Rapid fire and smoke damage recovery"
        }
      }
    ]
  }
};

export default EmergencyServiceSchema;