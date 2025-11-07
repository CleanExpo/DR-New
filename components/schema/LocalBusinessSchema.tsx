import Script from 'next/script';

interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface LocalBusinessSchemaProps {
  name: string;
  address: Address;
  phone: string;
  url: string;
  image: string;
  priceRange: string;
  serviceArea: string[];
  description?: string;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name,
  address,
  phone,
  url,
  image,
  priceRange,
  serviceArea,
  description = "24/7 Emergency Disaster Recovery Services. Master Restorer Phill McGurk. Water damage, fire damage, mould remediation, storm damage restoration."
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: name,
    description: description,
    url: url,
    telephone: phone,
    priceRange: priceRange,
    image: image,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.addressLocality === "Brisbane" ? -27.4698 :
                address.addressLocality === "Ipswich" ? -27.6141 :
                address.addressLocality === "Logan" ? -27.6390 : -27.4698,
      longitude: address.addressLocality === "Brisbane" ? 153.0251 :
                 address.addressLocality === "Ipswich" ? 152.7594 :
                 address.addressLocality === "Logan" ? 153.1094 : 153.0251
    },
    areaServed: serviceArea.map(area => ({
      "@type": "City",
      name: area
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "00:00",
        closes: "23:59"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Disaster Recovery Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Water Damage Restoration"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fire Damage Restoration"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mould Remediation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Storm Damage Repair"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Restoration"
          }
        }
      ]
    },
    sameAs: [
      "https://www.facebook.com/disasterrecoveryqld",
      "https://www.linkedin.com/company/disaster-recovery-qld",
      "https://www.instagram.com/disasterrecoveryqld"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Sarah Mitchell"
        },
        reviewBody: "Phill and his team were incredible. Water damage emergency at 2am and they were here within an hour. True Master Restorer!"
      }
    ]
  };

  return (
    <>
      <Script id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
};