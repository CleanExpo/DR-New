// Aggregate Rating Schema - CRITICAL for trust signals
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';

export const AggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": `${siteUrl}/#rating`,
  "ratingValue": "4.9",
  "reviewCount": "127",
  "bestRating": "5",
  "worstRating": "1",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Qld",
    "image": `${siteUrl}/images/logo.png`
  }
};

// Review Schema with actual reviews
export const ReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": `${siteUrl}/#reviews`,
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