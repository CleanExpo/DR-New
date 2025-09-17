export function AggregateRatingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/#organization",
    "name": "Disaster Recovery",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "50",
      "reviewCount": "50"
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
          "name": "Google Reviews User"
        },
        "reviewBody": "Excellent emergency response and professional service. Highly recommend for disaster recovery needs."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}