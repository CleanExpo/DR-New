interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: string[];
  provider: {
    name: string;
    telephone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export function ServiceSchema({
  name,
  description,
  url,
  areaServed,
  provider
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": name,
    "name": name,
    "description": description,
    "url": url,
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url,
      "servicePhone": provider.telephone,
      "serviceSmsNumber": provider.telephone
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": provider.name,
      "telephone": provider.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": provider.address.street,
        "addressLocality": provider.address.city,
        "addressRegion": provider.address.state,
        "postalCode": provider.address.postalCode,
        "addressCountry": provider.address.country
      }
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "availabilityStarts": "2011-07-01T00:00",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Free assessment and quote"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}