// Aggregate Rating Schema - CRITICAL for trust signals
export const AggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": "https://www.disasterrecovery.com.au/#rating",
  "ratingValue": "4.9",
  "reviewCount": "127",
  "bestRating": "5",
  "worstRating": "1",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Qld",
    "image": "https://www.disasterrecovery.com.au/images/logo.png"
  }
};

// Review Schema with actual reviews
export const ReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": "https://www.disasterrecovery.com.au/#reviews",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Qld",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brisbane",
      "addressRegion": "QLD",
      "addressCountry": "AU"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "datePublished": "2024-11-15",
  "reviewBody": "Phill McGurk and team responded within an hour to our water damage emergency in Hamilton. Professional, thorough, and insurance approved. Highly recommend!"
};

export default { AggregateRatingSchema, ReviewSchema };